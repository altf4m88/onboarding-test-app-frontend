import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      login();
      router.push('/');
    } else {
      // Handle error
      console.error('Login failed');
    }
  };

  return (
    <div className='container'>
      <div className='h-50 w-50 d-flex flex-column gap-2 mt-5'>
        <h1>Login</h1>
        <p>Get your daily silly cat facts</p>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
    
  );
};

export default Login;
