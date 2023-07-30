import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let array=["src/assets/normal.png","src/assets/sunny.png","src/assets/rainy.png"]

const rootStyles = {
  backgroundColor: '#020D45',
  color: '#ffffff',
  fontFamily: 'inter',
  fontSize: 'calc(5vw + 16px)', // Adjust font size for different screen sizes
  fontWeight: 400,
  lineHeight: '150%',
  letterSpacing: '-1px', // Slightly reduce the letter-spacing
  maxWidth: '400px', // Limit the width for better readability on mobile
  width: '90%', // Use percentage width to adapt to different screen sizes
  margin: '0 auto', // Center the element horizontally
  borderRadius: '20px',
  padding: '2%',
  textAlign: 'center', // Center text within the element
  background: 'radial-gradient(107.32% 141.42% at 0% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
  boxShadow: '-5px -5px 20px 0px rgba(255, 255, 255, 0.02) inset',
  backdropFilter: 'blur(10px)',
};

const condStyle = {
  fontSize: 'calc(4vw + 10px)', // Adjust font size for different screen sizes
  fontWeight: 500, // Make the condition text slightly bolder
  marginBottom: '10px', // Add some margin at the bottom of the condition text
};

const tempStyle = {
  fontSize: 'calc(8vw + 20px)', // Adjust font size for different screen sizes
  fontWeight: 700, // Make the temperature text bolder
  margin: '10px 0', // Add some vertical margin to temperature text
};

const nameStyle = {
  fontSize: 'calc(6vw + 12px)', // Adjust font size for different screen sizes
  fontWeight: 300, // Make the city name text semi-bold
};

function Temp({ name, temperature, imageSrc, condition }) {
  
  return (
    <div style={rootStyles} className="root">
      <img src={imageSrc} alt="" />
      <p style={tempStyle}>{temperature}</p>
      <small style={condStyle}>{condition}</small>
      <p style={nameStyle}>{name}</p>
      <button onClick={getUserLocation}>Get Location</button>
    </div>
  );
}

// ... (rest of the code remains the same)

  

const root = document.getElementById("root");



const apiKey = "3d120c29f97d4cec94f114215232907"
let apiUrl;
getUserLocation()
// Function to get the user's location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Success callback for geolocation
function onSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // document.getElementById("loca").innerHTML=` ${latitude} + ${longitude}`
  // Call the function to fetch weather data with the obtained coordinates
  fetchWeatherData(latitude, longitude);
}

function onError(error) {
  console.error('Error getting user location:', error);
  const errorMessage = 'Weather data cannot be fetched without access to your location.';
  // document.getElementById("loca").innerHTML = errorMessage;
  const defaultLatitude = 28.6139; // New Delhi latitude
  const defaultLongitude = 77.2090; // New Delhi longitude
  fetchWeatherData(defaultLatitude, defaultLongitude);
}

async function fetchWeatherData(latitude, longitude) {
  apiUrl= `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
  fetch(apiUrl).then((response) => response.json()).then((data)=> {
      // document.getElementById("temp").innerHTML=JSON.stringify(data)
      // document.getElementById("loca").innerHTML=JSON.stringify(data.location.name)
      let temperature = JSON.stringify(data.current.temp_c)
      let precip_in = JSON.stringify(data.current.precip_p)
      let name = data.location.name
      let imageSrc = imageSelect(precip_in,temperature)
      let condition = data.current.condition.text
      ReactDOM.createRoot(root).render(<Temp name={name} temperature={temperature} imageSrc={imageSrc} condition={condition}/>);
      console.log(JSON.stringify(data))
  })
}
function imageSelect(precip_in,temperature){
    if(temperature>25){
      return array[1]
    }
    else if(precip_in>0.1){
      return array[2]
    }
    else{
      return array[0]
    }
}




