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
        console.error('Failed to fetch cat facts');
      }
    };
  
    useEffect(() => {
    }, []);
  
    return (
        <ProtectedRoute>
          <div className="container">
            <div className='d-flex align-items-center gap-2 mt-5'>
                <Image className='cat-profile-picture' src={catImage} alt="Cat" height={300} />
                <h1>CatGPT</h1>
            </div>
            <Box sx={{ width: '50%', maxWidth: 1000, margin: 'auto', mt: 5, mb: 5 }}>
                <List>
                    {gatoChats.map((chat, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                                primary={chat.message} 
                                sx={{ textAlign: chat.role === 'user' ? 'right' : 'left', backgroundColor: "#F5D460", padding: 2, borderRadius: 4 }}
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
                        <SendIcon />
                    </Button>
                </Box>
            </Box>
          </div>
        </ProtectedRoute>
      );
}


export default Chat;