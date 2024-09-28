import React, { useState, useEffect } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Paper, TextField, IconButton, Avatar, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DashboardLayout from '../components/DashboardLayout';
import { getMatchedUsers, getMessages, sendMessage, connectWebSocket, disconnectWebSocket } from '../services/chatService';
import { getUserPhoto } from '../services/photoService'; // Import funkcji do pobierania zdjęć
import { motion } from 'framer-motion';

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
  const [userPhoto, setUserPhoto] = useState(null); // Stan do przechowywania zdjęcia użytkownika
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

    // Connect to WebSocket when component loads
    connectWebSocket(loggedInUserId, handleMessageReceived);

    // Disconnect WebSocket on unmount
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

      const fetchUserPhoto = async () => {
        try {
          const photoUrl = await getUserPhoto(selectedUser.id);
          setUserPhoto(photoUrl); // Ustawienie zdjęcia użytkownika
        } catch (error) {
          console.error('Error fetching user photo:', error);
        }
      };
      fetchUserPhoto();
    }
  }, [selectedUser]);

  // Handle receiving real-time messages
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

  const renderUserDetails = () => {
    if (!selectedUser) return null;

    const { role, socialGoals, strategies, projectExperience, budget, partners, grants, hobbies } = selectedUser;

    return (
      <Box>
        {role === 'ngo' && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 1, color: '#fff' }}>Social Goals</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{socialGoals || 'No social goals specified.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Strategies</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{strategies || 'No strategies specified.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Project Experience</Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>{projectExperience || 'No project experience specified.'}</Typography>
          </>
        )}
        {role === 'business' && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 1, color: '#fff' }}>Social Goals</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{socialGoals || 'No social goals specified.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Strategies</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{strategies || 'No strategies specified.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Budget</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{budget ? `$${budget}` : 'No budget specified.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Partners</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{partners || 'No partners specified.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Grants</Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>{grants || 'No grants specified.'}</Typography>
          </>
        )}
        {role === 'volunteer' && (
          <>
            <Typography variant="h6" sx={{ marginBottom: 1, color: '#fff' }}>Description</Typography>
            <Typography variant="body2" sx={{ color: '#fff', marginBottom: 2 }}>{selectedUser.description || 'No description provided.'}</Typography>
            <Divider sx={{ backgroundColor: '#fff' }} />
            <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1, color: '#fff' }}>Hobbies</Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>{selectedUser.hobbies || 'No hobbies specified.'}</Typography>
          </>
        )}
      </Box>
    );
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: 'tween', duration: 0.3 }}
        sx={{ padding: 0, marginLeft: 0, height: '100vh' }}
      >
        <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center' }}>
          {/* Contact list panel */}
          <Box
            sx={{
              width: '12%',
              overflowY: 'auto',
              height: '100%',
              backgroundColor: 'rgba(109, 109, 109, 0.4)',
              padding: 0,
              marginTop: '64px',
              position: 'fixed',
              left: 0,
              top: 0,
            }}
          >
            <List sx={{ width: '100%' }}>
              {matchedUsers.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  onClick={() => handleSelectUser(user)}
                  selected={selectedUser && selectedUser.id === user.id}
                  sx={{
                    padding: '10px 16px',
                    backgroundColor: selectedUser && selectedUser.id === user.id
                      ? 'rgba(65, 140, 181, 0.6)'
                      : 'rgba(109, 109, 109, 0.0)',
                    '&:hover': {
                      backgroundColor: 'rgba(109, 109, 109, 0.6)',
                    },
                    color: 'black',
                    transition: 'background-color 0.3s ease',
                    border: 'none',
                  }}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Chat messages section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              width: '60%',
              backgroundColor: 'transparent',
              height: '87vh',
            }}
          >
            {/* Messages list */}
            <Box sx={{ flex: 1, overflowY: 'auto', padding: 2, backgroundColor: 'transparent' }}>
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
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        borderBottomLeftRadius: msg.senderId === loggedInUserId ? '20px' : 0,
                        borderBottomRightRadius: msg.senderId === loggedInUserId ? 0 : '20px',
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
                        color: 'black',
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'black',
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

          {/* User profile section (right-side) */}
          {selectedUser && (
            <Box
              sx={{
                width: '15%',
                padding: 3,
                backgroundColor: 'rgba(109, 109, 109, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'fixed',
                right: 0,
                top: '64px',
                height: 'calc(100vh - 64px)',
              }}
            >
              <Avatar
                alt={selectedUser.name}
                src={userPhoto || '/default-profile.png'}
                sx={{ width: 120, height: 120, marginBottom: 2 }}
              />
              <Typography variant="h6" sx={{ color: '#fff', marginBottom: 1 }}>
                {selectedUser.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff', textAlign: 'center', opacity: 0.8 }}>
                {selectedUser.description || 'This user has no description.'}
              </Typography>
              <Divider sx={{ backgroundColor: '#fff', marginY: 2, width: '100%' }} />
              {renderUserDetails()}
            </Box>
          )}
        </Box>
      </motion.div>
    </DashboardLayout>
  );
};

export default ChatPage;
