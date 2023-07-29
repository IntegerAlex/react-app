import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

let array=["src/assets/normal.png","src/assets/sunny.png","src/assets/rainy.png"]

function Temp({name,temperature,imageSrc,condition}) {
  const rootStyles = {
      
      backgroundColor: '#020D45',
      color: '#ffffff',
      fontFamily: 'Inter',
      fontSize: 'calc(4vw + 20px)',
      fontStyle: 'normal',
      fontWeight: 200,
      lineHeight: '120%', /* 240px */
      letterSpacing: '-10px',
      display: 'flex',
      maxWidth: '521px',
      width: '70%',
      margin: '0 auto',
      flexWrap: 'wrap',
      padding: '1%',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '50px',
      background: 'radial-gradient(107.32% 141.42% at 0% 0%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
      boxShadow: '-5px -5px 250px 0px rgba(255, 255, 255, 0.02) inset',
      backdropFilter: 'blur(21px)',
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '50px',
    }
    const condstyle = {
      fontSize: 'calc(1vw + 35px)', // Adjust relative font size for condition
      lineHeight: '0', // Add some spacing between lines
      whiteSpace:'nowrap', // Add margin between the condition and name
    };
  
    const nameStyle = {
      fontSize: 'calc(2vw + 20px)', 
      whiteSpace:'nowrap'// Adjust relative font size for name
    };
 

  return(
    <div style={rootStyles} className="root">
      <img src={imageSrc} alt="" />
      <p>{temperature}</p>
      <small style={condstyle}>{condition}</small>
      <p>{name}</p>
    </div>
  )
  
};
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




