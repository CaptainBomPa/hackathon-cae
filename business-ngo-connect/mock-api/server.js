const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

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
        role: user.role
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid login credentials' });
  }
});

// Custom POST route for register
server.post('/api/register', upload.array('images', 5), (req, res) => {
  const { name, email, password, role, description, categories } = req.body;
  const users = router.db.get('users').value();
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    res.status(400).json({ message: 'User with this email already exists' });
  } else {
    // Pobranie nazw plików zdjęć
    const images = req.files.map(file => file.filename);

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role,
      description,
      categories,
      images
    };
    router.db.get('users').push(newUser).write();
    res.status(201).json({ message: 'Registration successful', user: newUser });
  }
});

// Custom GET route to fetch all users
server.get('/api/users', (req, res) => {
  const users = router.db.get('users').value();
  res.status(200).json(users);
});

// Custom GET route to fetch matched users for a specific user
server.get('/api/match', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  // Find all matched users for the given user ID
  const matchedRelations = router.db.get('match').filter(
    match => match.userId1 === parseInt(userId) || match.userId2 === parseInt(userId)
  ).value();

  // Get unique matched user IDs
  const matchedUserIds = matchedRelations.map(match => 
    match.userId1 === parseInt(userId) ? match.userId2 : match.userId1
  );

  // Find matched users details
  const matchedUsers = router.db.get('users').filter(user => matchedUserIds.includes(user.id)).value();

  res.status(200).json(matchedUsers);
});

// Custom POST route for adding a new message
server.post('/api/chat/send', (req, res) => {
  const { relationId, message, senderId, receiverId } = req.body;

  if (!relationId || !message || !senderId || !receiverId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMessage = {
    id: router.db.get('messages').value().length + 1,
    relationId,
    message,
    timestamp: new Date().toISOString(),
    senderId,
    receiverId
  };

  router.db.get('messages').push(newMessage).write();
  res.status(201).json({ message: 'Message sent successfully', newMessage });
});

// Custom GET route to fetch messages between two users
server.get('/api/chat/messages', (req, res) => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
    return res.status(400).json({ message: 'Sender ID and Receiver ID are required' });
  }

  const messages = router.db.get('messages').filter(
    msg => (msg.senderId === parseInt(senderId) && msg.receiverId === parseInt(receiverId)) ||
           (msg.senderId === parseInt(receiverId) && msg.receiverId === parseInt(senderId))
  ).value();

  res.status(200).json(messages);
});

// Custom PUT route for updating user profile
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
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Custom PUT route for changing user password
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
      res.status(200).json({ message: 'Password changed successfully' });
    } else {
      res.status(400).json({ message: 'Invalid current password' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Custom GET to fetch one image
server.get('/api/:userId/', (req, res) => {
  const { userId } = req.params;
  const user = router.db.get('users').find({ id: parseInt(userId) }).value();

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userDirectory = path.join(__dirname, 'uploads', user.email);

  // Check if user directory exists
  if (!fs.existsSync(userDirectory)) {
    return res.status(404).json({ message: 'User directory not found' });
  }

  // Read the user directory and get the first image file
  fs.readdir(userDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading directory' });
    }

    // Filter for image files only
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

    if (imageFiles.length === 0) {
      return res.status(404).json({ message: 'No images found in user directory' });
    }

    // Get the first image file
    const firstImageFile = imageFiles[0];
    const filePath = path.join(userDirectory, firstImageFile);

    res.sendFile(filePath);
  });
});

// Use default router
server.use('/api', router);

// Start the server
const PORT = process.env.PORT || 4000; // Ustawienie portu na 4000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
