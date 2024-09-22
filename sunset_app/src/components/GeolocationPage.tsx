'use client'; // This makes this component a Client Component

import { useEffect, useState } from "react";

const GeolocationPage = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
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
  );
};

export default GeolocationPage;