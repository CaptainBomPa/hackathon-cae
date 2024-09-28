import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, TextField, IconButton, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DashboardLayout from '../components/DashboardLayout';
import { getMatchedUsers, getMessages, sendMessage } from '../services/chatService'; // Zaktualizowane importy
import { motion } from 'framer-motion'; // Import framer-motion

const pageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const ChatPage = () => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const loggedInUserId = 4; // Zalogowany użytkownik

  useEffect(() => {
    // Pobranie sparowanych użytkowników
    const fetchMatchedUsers = async () => {
      try {
        const usersData = await getMatchedUsers(loggedInUserId);
        setMatchedUsers(usersData);
      } catch (error) {
        console.error('Error fetching matched users:', error);
      }
    };
    fetchMatchedUsers();
  }, []);

  useEffect(() => {
    // Pobranie wiadomości po wybraniu użytkownika
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const messagesData = await getMessages(loggedInUserId, selectedUser.id);
          setMessages(messagesData);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !selectedUser) return;
    const message = {
      relationId: selectedUser.id, // Zakładamy, że `relationId` to ID użytkownika
      senderId: loggedInUserId,
      receiverId: selectedUser.id,
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    try {
      await sendMessage(message);
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'tween', duration: 0.3 }}
        sx={{padding: 0, marginLeft: 0}}
      >
        <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: 0, margin: 0 }}>
          <Box sx={{ width: '250px', borderRight: '1px solid #ddd', overflowY: 'auto', height: '100%', padding: 0, margin: 0 }}>
            <Typography variant="h6" align="center" gutterBottom sx={{ mt: 2, color: "#fff" }}>
              Contacts
            </Typography>
            <List>
              {matchedUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    button
                    onClick={() => handleSelectUser(user)}
                    selected={selectedUser && selectedUser.id === user.id}
                    sx={{ padding: '10px 16px', color: "#fff" }}
                  >
                    <ListItemText primary={user.name} />
                  </ListItem>
                  <Divider color="white" />
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Chat */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            {/* Lista wiadomości */}
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
              <Typography variant="h6" align="center" gutterBottom sx={{ color: "#fff" }}>
                {selectedUser ? selectedUser.name : 'Select a contact'}
              </Typography>
              {messages.length === 0 ? (
                <Typography variant="body1" align="center" color="textSecondary" sx={{ color: "#fff" }}>
                  No messages.
                </Typography>
              ) : (
                messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.senderId === loggedInUserId ? 'flex-end' : 'flex-start',
                      mb: 1.5,
                    }}
                  >
                    <Paper
                      sx={{
                        padding: '10px',
                        backgroundColor: msg.senderId === loggedInUserId ? '#82ff82' : '#f1f1f1',
                        maxWidth: '70%',
                        wordBreak: 'break-word',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {msg.content}
                      </Typography>
                      <Typography variant="caption" display="block" align="right">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Paper>
                  </Box>
                ))
              )}
            </Box>

            {/* Wysyłanie wiadomości */}
            {selectedUser && (
              <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderTop: '1px solid #ddd' }}>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  InputProps={{
                    sx: {
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'white',
                        opacity: 0.75,
                      },
                    },
                  }}
                />
                <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
                  <SendIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default ChatPage;
