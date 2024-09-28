import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Paper, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DashboardLayout from '../components/DashboardLayout';
import { getMatchedUsers, getMessages, sendMessage, connectWebSocket, disconnectWebSocket } from '../services/chatService'; // Updated imports
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
  const loggedInUserId = 4; // Logged in user

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        const usersData = await getMatchedUsers(loggedInUserId);
        setMatchedUsers(usersData);
      } catch (error) {
        console.error('Error fetching matched users:', error);
      }
    };
    fetchMatchedUsers();
    
    // Połącz z WebSocket po załadowaniu komponentu
    connectWebSocket(loggedInUserId, handleMessageReceived);

    // Rozłącz WebSocket po odmontowaniu komponentu
    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
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

  // Obsługa odbierania wiadomości w czasie rzeczywistym
  const handleMessageReceived = (receivedMessage) => {
    if (receivedMessage.senderId === selectedUser.id || receivedMessage.receiverId === selectedUser.id) {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedUser) return;
    const message = {
      senderId: loggedInUserId,
      receiverId: selectedUser.id,
      content: newMessage,
      isRead: false,
    };
    sendMessage(message);
    setMessages([...messages, message]);
    setNewMessage('');
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
        sx={{padding: 0, marginLeft: 0, height:'100vh'}}
      >
        <Box>
          {/* Contact list panel */}
          <Box
            sx={{
              width: '12%',
              overflowY: 'auto',
              height: '100%',
              backgroundColor: 'rgba(109, 109, 109, 0.4)', // Similar styling to MainPage
              padding: 0,
              marginTop: '64px',
              position: 'fixed',
              left: 0,
              top: 0,
            }}
          >
            <List sx={{ width: '100%' }}>
              {matchedUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    button
                    onClick={() => handleSelectUser(user)}
                    selected={selectedUser && selectedUser.id === user.id}
                    sx={{
                      padding: '10px 16px',
                      backgroundColor: selectedUser && selectedUser.id === user.id
                        ? 'rgba(65, 140, 181, 0.6)'
                        : 'rgba(109, 109, 109, 0.0)', // Background color when selected
                      '&:hover': {
                        backgroundColor: 'rgba(109, 109, 109, 0.6)', // Hover color
                      },
                      color: 'black',
                      transition: 'background-color 0.3s ease', // Smooth background transition
                      border: 'none', // Remove borders
                    }}
                  >
                    <ListItemText primary={user.name} />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Chat */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              width: '60%',
              marginLeft: '30%', // Przesunięcie zawartości głównej w prawo, aby nie była zasłonięta przez lewy panel
              backgroundColor: 'transparent',
              height: '87vh'
              
            }}
          >
            {/* Messages list */}
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, backgroundColor: 'transparent' }}>
              <Typography variant="h6" align="center" gutterBottom sx={{ color: '#fff' }}>
                {selectedUser ? selectedUser.name : 'Select a contact'}
              </Typography>
              {messages.length === 0 ? (
                <Typography variant="body1" align="center" color="textSecondary" sx={{ color: '#fff' }}>
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
                        backgroundColor: msg.senderId === loggedInUserId ? '#418CB5' : '#f1f1f1',
                        maxWidth: '70%',
                        wordBreak: 'break-word',
                        // borderRadius: '20px',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        borderBottomLeftRadius: msg.senderId === loggedInUserId ? '20px' : 0,
                        borderBottomRightRadius: msg.senderId === loggedInUserId ? 0 : '20px'
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

            {/* Sending message */}
            {selectedUser && (
              <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
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
