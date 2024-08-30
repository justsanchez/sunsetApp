// pages/index.tsx
import React from 'react';
import InteractiveButton from '../components/InteractiveComponent'; // Import Client Component

// Coordinates for Wilminton
const latitude =  34.2104
const longitude = -77.8868
const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error('Error:', error))


const Page: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <p>Hello World!</p>
      <InteractiveButton /> {/* Use Client Component here */}
    </div>
  );
};

export default Page;