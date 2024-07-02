import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useAuth } from '@/context/AuthContext';

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleRegister = async () => {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      login();
      router.push('/login');
    } else {
      // Handle error
      console.error('Registration failed');
    }
  };

  return (
    <div className='container'>
      <div className='h-50 w-50 d-flex flex-column gap-2 mt-5'>
        <h1>Register</h1>
        <p>New around here? register your account</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          className='form-control'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className='form-control'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
