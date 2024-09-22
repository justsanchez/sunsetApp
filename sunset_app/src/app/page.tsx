'use client'; // This makes this component a Client Component
import { useEffect, useState } from "react";

// Define the expected structure of the sunrise/sunset data
interface SunriseSunsetData {
  results: {
    date: string;
    sunrise: string;
    sunset: string;
    first_light: string;
    last_light: string;
    dawn: string;
    dusk: string;
    solar_noon: string;
    day_length: string;
    timezone: string;
  };
}

export default function Home() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sunData, setSunData] = useState<SunriseSunsetData | null>(null); // State to hold sunrise/sunset data

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError("Geolocation request timed out.");
    }, 10000); // Set timeout for 10 seconds

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false); // Stop loading
          clearTimeout(timeoutId); // Clear the timeout on success
        },
        (error) => {
          setLoading(false);
          setError("Geolocation failed: " + error.message);
          clearTimeout(timeoutId); // Clear the timeout on error
        }
      );
    } else {
      setLoading(false);
      setError("Geolocation is not supported by your browser.");
    }

    return () => clearTimeout(timeoutId); // Clean up timeout on component unmount
  }, []);

  // Fetch sunrise/sunset data when the component mounts or when location changes
  const fetchSunriseSunsetData = async (latitude: number, longitude: number) => {
    // Use the provided latitude and longitude
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const fullDate = `${year}-${month}-${day}`;
  
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=NYT&date=${fullDate}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      setSunData(data); // Update state with the fetched data
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  
  // Call fetch function when location changes
  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchSunriseSunsetData(location.latitude, location.longitude);
    }
  }, [location]); // Fetch data when location changes
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <p>Hello!</p>
      {/* Display the fetched data */}
      {sunData?.results && (
        <div className="space-y-2">
          <p>Date: {sunData.results.date}</p>
          <p>Sunrise: {sunData.results.sunrise}</p>
          <p>Sunset: {sunData.results.sunset}</p>
          <p>First Light: {sunData.results.first_light}</p>
          <p>Last Light: {sunData.results.last_light}</p>
          <p>Dawn: {sunData.results.dawn}</p>
          <p>Dusk: {sunData.results.dusk}</p>
          <p>Solar Noon: {sunData.results.solar_noon}</p>
          <p>Day Length: {sunData.results.day_length}</p>
          <p>Timezone: {sunData.results.timezone}</p>
        </div>
      )}


<div className="flex flex-col justify-center items-center">
      <h1>Geolocation Pull</h1>
      {loading ? (
        <p>Fetching location...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
    </div>
  );
}