import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Image from 'next/image';
import catImage from '../public/images/main.png';
import { Box, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface GatoChat {
    role: string;
    message: string;
}

const Chat: React.FC = () => {
    const [gatoChats, setGatoChats] = useState<GatoChat[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleGatoChats = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/gato-chats', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message : inputMessage}),
      });
  
      if (response.ok) {
        setGatoChats(prevFacts => [...prevFacts, {
            role : 'user',
            message : inputMessage
        }]);
        const responseData = await response.json();
        setGatoChats(prevFacts => [...prevFacts, responseData]); // Append new facts to existing ones
      } else {
        // Handle error
        console.error('Failed to fetch response');
      }
    };

    const fetchChatHistory = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/gato-chats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
            const chatHistory: GatoChat[] = await response.json();
            setGatoChats(chatHistory);
        } else {
          // Handle error
          console.error('Failed to fetch response');
        }
    }
  
    useEffect(() => {
        fetchChatHistory();
    }, []);
  
    return (
        <ProtectedRoute>
          <div className="container">
            <div className='d-flex align-items-center gap-2 mt-5'>
                <Image className='cat-profile-picture' src={catImage} alt="Cat" height={300} />
                <h1>CatGPT</h1>
            </div>
            <Box sx={{ width: '75%', maxWidth: 1000, margin: 'auto', mt: 5, mb: 5 }}>
                <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {gatoChats.map((chat, index) => (
                        chat.role === 'user' 
                        ?  <ListItem sx={{ width: '50%', alignSelf: 'flex-end'}} key={index}>
                                <ListItemText 
                                    primary={chat.message} 
                                    sx={{ backgroundColor:  "#F5D460", padding: 2, borderRadius: 4 }}
                                />
                            </ListItem>
                        :
                        <ListItem sx={{ width: '50%'}} key={index}>
                            <ListItemText 
                                primary={chat.message} 
                                sx={{ backgroundColor: "#B7F3F9", padding: 2, borderRadius: 4 }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <Button onClick={handleGatoChats}  sx={{ p: 2 }}>
                        <SendIcon sx={{ color : "#F5D460"}} />
                    </Button>
                </Box>
            </Box>
          </div>
        </ProtectedRoute>
      );
}


export default Chat;