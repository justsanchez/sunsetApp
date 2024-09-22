'use client'; // This makes this component a Client Component

import { useEffect, useState } from "react";


const GeolocationPage = () => {
  // Initialize latitude and longitude with default values (0, 0)
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if geolocation is available in the user's browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude }); // Update location with actual data
        },
        (error) => {
          setError("Geolocation failed: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center ">
      <h1>Geolocation Pull</h1>

      {/* Display location if available */}
      {location.latitude !== 0 && location.longitude !== 0 ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>{error ? error : "Fetching location..."}</p>
      )}
    </div>
  );
};

export default GeolocationPage;