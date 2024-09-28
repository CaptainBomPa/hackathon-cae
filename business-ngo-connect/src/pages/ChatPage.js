import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, TextField, IconButton, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DashboardLayout from '../components/DashboardLayout';
import { getRelations, getMessages, sendMessage } from '../services/chatService';
import { getAllUsers } from '../services/userService';
import { motion } from 'framer-motion'; // Import framer-motion

const pageVariants = {
    initial: { opacity: 0, scale: 0.8 }, // Startowe wartości: przezroczystość i zmniejszenie rozmiaru
    animate: { opacity: 1, scale: 1 },   // Animacja do pełnej widoczności i normalnego rozmiaru
    exit: { opacity: 0, scale: 0.8 }     // Zanikanie i zmniejszenie przy wychodzeniu
};

const ChatPage = () => {
    const [relations, setRelations] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRelation, setSelectedRelation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const loggedInUserId = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const relationsData = await getRelations(loggedInUserId);
                setRelations(relationsData);
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedRelation) {
            const fetchMessages = async () => {
                try {
                    const messagesData = await getMessages(selectedRelation.id);
                    setMessages(messagesData);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
            fetchMessages();
        }
    }, [selectedRelation]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !selectedRelation) return;
        const message = {
            relationId: selectedRelation.id,
            senderId: loggedInUserId,
            message: newMessage,
            timestamp: new Date().toISOString()
        };
        try {
            await sendMessage(selectedRelation.id, message);
            setMessages([...messages, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleSelectRelation = (relation) => {
        setSelectedRelation(relation);
        setMessages([]);
    };

    return (
        <DashboardLayout>
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: 'tween', duration: 0.3 }} // Szybsza animacja z użyciem tween zamiast spring
            >
                <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                    {/* Lista relacji */}
                    <Box sx={{ width: '250px', borderRight: '1px solid #ddd', overflowY: 'auto', height: '100%' }}>
                        <Typography variant="h6" align="center" gutterBottom sx={{ mt: 2, color: "#fff" }}>
                            Kontakty
                        </Typography>
                        <List>
                            {relations.map((relation) => {
                                const partnerId = relation.userId1 === loggedInUserId ? relation.userId2 : relation.userId1;
                                const partner = users.find((user) => user.id === partnerId);
                                return (
                                    <React.Fragment key={relation.id}>
                                        <ListItem
                                            button
                                            onClick={() => handleSelectRelation(relation)}
                                            selected={selectedRelation && selectedRelation.id === relation.id}
                                            sx={{ padding: '10px 16px', color: "#fff" }}
                                        >
                                            <ListItemText primary={partner ? partner.name : 'Nieznany użytkownik'} />
                                        </ListItem>
                                        <Divider color="white" />
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Box>

                    {/* Chat */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                        {/* Lista wiadomości */}
                        <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
                            <Typography variant="h6" align="center" gutterBottom sx={{ color: "#fff" }}>
                                {selectedRelation
                                    ? `${users.find((user) =>
                                        user.id ===
                                        (selectedRelation.userId1 === loggedInUserId ? selectedRelation.userId2 : selectedRelation.userId1)
                                    )?.name
                                    }`
                                    : 'Wybierz kontakt'}
                            </Typography>
                            {messages.length === 0 ? (
                                <Typography variant="body1" align="center" color="textSecondary" sx={{ color: "#fff" }}>
                                    Brak wiadomości.
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
                                                {msg.message}
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
                        {selectedRelation && (
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderTop: '1px solid #ddd' }}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Napisz wiadomość..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    InputProps={{
                                        sx: {
                                            '& .MuiInputBase-input': {
                                                color: 'white', // Zmiana koloru tekstu na biały
                                            },
                                            '& .MuiInputBase-input::placeholder': {
                                                color: 'white', // Zmiana koloru placeholdera na biały
                                                opacity: 0.75, // Pełna widoczność placeholdera
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
