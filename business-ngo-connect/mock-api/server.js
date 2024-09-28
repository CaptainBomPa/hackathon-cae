const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfiguracja multer do zapisywania plików w katalogu uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userDir = path.join(__dirname, 'uploads', req.body.email);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


// Custom POST route for login
server.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type
      }
    });
  } else {
    res.status(401).json({ message: 'Nie poprawne dane logowania' });
  }
});

// Custom POST route for register
server.post('/api/register', upload.array('images', 5), (req, res) => {
  const { name, email, password, type, description, categories } = req.body;
  const users = router.db.get('users').value();
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    res.status(400).json({ message: 'Użytkownik z podanym adresem email już istnieje' });
  } else {
    // Pobranie nazw plików zdjęć
    const images = req.files.map(file => file.filename);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      type,
      description,
      categories,
      images
    };
    router.db.get('users').push(newUser).write();
    res.status(201).json({ message: 'Zarejestrowano pomyślnie', user: newUser });
  }
});

// Custom GET route to fetch all users
server.get('/api/users', (req, res) => {
  const users = router.db.get('users').value();
  res.status(200).json(users);
});

//Custom GET to fetch one img
server.get('/:userId/:filename', (req, res) => {
  const { userId, filename } = req.params;
  const user = router.db.get('users').find({ id: parseInt(userId) }).value();

  if (!user || !user.images.includes(filename)) {
    return res.status(404).json({ message: 'Zdjęcie nie zostało znalezione' });
  }

  const filePath = path.join(__dirname, 'uploads', user.email, filename);
  res.sendFile(filePath);
});

// Custom POST route for adding a new message
server.post('/api/messages', (req, res) => {
  const { relationId, message, senderId } = req.body;

  if (!relationId || !message || !senderId) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane' });
  }

  // Sprawdź, czy relacja istnieje
  const relation = router.db.get('relations').find({ id: relationId }).value();
  if (!relation) {
    return res.status(404).json({ message: 'Nie znaleziono relacji' });
  }

  // Utwórz nową wiadomość
  const newMessage = {
    id: router.db.get('messages').value().length + 1,
    relationId,
    message,
    timestamp: new Date().toISOString(), // Aktualny czas w formacie ISO
    senderId
  };

  // Zapisz wiadomość w bazie
  router.db.get('messages').push(newMessage).write();

  res.status(201).json({ message: 'Wiadomość została dodana', newMessage });
});

// Custom GET route to fetch messages for a specific relation
server.get('/api/messages/:relationId', (req, res) => {
  const { relationId } = req.params;
  const messages = router.db.get('messages').filter({ relationId: parseInt(relationId) }).value();

  // Zwróć status 200 z pustą listą, jeśli nie ma wiadomości
  res.status(200).json(messages);
});

// Custom GET route to fetch relations for a specific user
server.get('/api/relation/:userId', (req, res) => {
  const { userId } = req.params;
  const relations = router.db.get('relations').filter(relation =>
    relation.userId1 === parseInt(userId) || relation.userId2 === parseInt(userId)
  ).value();

  res.status(200).json(relations);
});

// Custom PUT route for updating profile
server.put('/api/users/:id', upload.array('images', 5), (req, res) => {
  const userId = parseInt(req.params.id);
  const { description, categories } = req.body;
  let images = [];

  if (req.files) {
    images = req.files.map(file => file.filename);
  }

  const users = router.db.get('users').value();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    const updatedUser = {
      ...users[userIndex],
      description: description || users[userIndex].description,
      categories: categories || users[userIndex].categories,
      images: images.length > 0 ? images : users[userIndex].images,
    };
    router.db.get('users').splice(userIndex, 1, updatedUser).write();
    res.status(200).json({ message: 'Profil został zaktualizowany', user: updatedUser });
  } else {
    res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
  }
});

// Custom PUT route for changing password
server.put('/api/users/:id/password', (req, res) => {
  const userId = parseInt(req.params.id);
  const { currentPassword, newPassword } = req.body;
  const users = router.db.get('users').value();
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    const user = users[userIndex];
    if (user.password === currentPassword) {
      user.password = newPassword;
      router.db.get('users').splice(userIndex, 1, user).write();
      res.status(200).json({ message: 'Hasło zostało zmienione pomyślnie' });
    } else {
      res.status(400).json({ message: 'Nieprawidłowe aktualne hasło' });
    }
  } else {
    res.status(404).json({ message: 'Użytkownik nie został znaleziony' });
  }
});

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const users = router.db.get('users').value();
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Użytkownik nie znaleziony.' });
  }

  const updatedUser = { ...users[userIndex], ...req.body };
  router.db.get('users').splice(userIndex, 1, updatedUser).write();
  res.status(200).json(updatedUser);
});

// Use default router
server.use('/api', router);

// Start the server
const PORT = process.env.PORT || 4000; // Ustawienie portu na 4000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
