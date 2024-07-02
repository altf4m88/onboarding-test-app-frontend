"use client"; // Add this line at the top

import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Image from 'next/image';
import catImage from '../public/images/main.png'; // Import your local image

interface CatFact {
  _id: string;
  text: string;
  // Add other properties if necessary
}

const Home: React.FC = () => {
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);

  const fetchCatFacts = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/cat-facts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setCatFacts(prevFacts => [...prevFacts, data]); // Append new facts to existing ones
    } else {
      // Handle error
      console.error('Failed to fetch cat facts');
    }
  };

  useEffect(() => {
    fetchCatFacts();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container">
        <h1>Cat Facts</h1>
        <Image src={catImage} alt="Cat" height={300} />
        <button onClick={fetchCatFacts}>Get New Cat Facts</button>
        {catFacts.map((fact) => (
          <div key={fact._id} className="cat-fact">
            {fact.text}
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default Home;
