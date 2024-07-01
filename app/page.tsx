"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import catImage from '../public/images/main.png'; // Import your local image

interface CatFact {
  _id: string;
  text: string;
}

const Home: React.FC = () => {
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);

  const fetchCatFacts = async () => {
    try {
      const response = await fetch('http://localhost:3000/cat-facts');
      const data = await response.json();
      setCatFacts(prevFacts => [...prevFacts, data]); // Append new facts to existing ones
      
    } catch (error) {
      console.error('Error fetching cat facts:', error);
    }
  };

  useEffect(() => {
    fetchCatFacts();
  }, []);

  return (
    <div className="container">
      <h1>Cat Facts</h1>
      <Image src={catImage} alt="Cat" height={300} /> {/* Local image */}
      <button onClick={fetchCatFacts}>Next Facts</button>
      {catFacts.map((fact) => (
        <div key={fact._id} className="cat-fact">
          {fact.text}
        </div>
       ))}
    </div>
  );
};

export default Home;
