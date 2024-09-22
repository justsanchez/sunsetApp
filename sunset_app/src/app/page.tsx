

import GeolocationComponent from '../components/GeolocationPage';


// page.tsx - Server-side rendering for initial load
export default async function Home() {
  
  

  // Wilmington Coords.
  const latitude = 34.2239; 
  const longitude = -77.036873; 

  const today = new Date(); // initializing date
  
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');

  // get the full date
  const fullDate = `${year}-${month}-${day}`;
  
  console.log(fullDate);
  
  const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=NYT&date=${year}-${month}-${day}`;
  console.log(url);
  
  // Fetch data on the server side
  const response = await fetch(url);
  const data = await response.json();


  

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <p>Hello!</p>

      {/* Display the fetched data */}
      {data.results && (
        <div className="space-y-2">
          <p>Date: {data.results.date}</p>
          <p>Sunrise: {data.results.sunrise}</p>
          <p>Sunset: {data.results.sunset}</p>
          <p>First Light: {data.results.first_light}</p>
          <p>Last Light: {data.results.last_light}</p>
          <GeolocationComponent />
          {/* Does GeolocationComponent work for moible? */}
        </div>
      )}
    </div>
  );
}