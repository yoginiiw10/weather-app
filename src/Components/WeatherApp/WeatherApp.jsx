import React , {useState} from 'react';
import './WeatherApp.css';

import search from '../Asset/search.png'
import clear from '../Asset/clear.png'
import cloud from '../Asset/cloud.png'
import drizzle from '../Asset/drizzle.png'
import rain from '../Asset/rain.png'
import snow from '../Asset/snow.png'
import wind from '../Asset/wind.png'
import humidity from '../Asset/humidity.png'

const WeatherApp = () => {

    let api_key = "5458994cce3145e87d6d83048048e645";

    const[wicon,setWicon] = useState(cloud);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value===""){
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);

        let data = await response.json();

        const humidity = document.getElementsByClassName('humidity-percent');
        const wind = document.getElementsByClassName('wind-rate');
        const temperature = document.getElementsByClassName('weather-temp');
        const location = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" kmph";
        temperature[0].innerHTML = data.main.temp+" C";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==='01n'){
            setWicon(clear);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==='02n'){
            setWicon(cloud);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==='03n'){
            setWicon(drizzle);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==='04n'){
            setWicon(drizzle);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==='09n'){
            setWicon(rain);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==='10n'){
            setWicon(rain);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==='13n'){
            setWicon(snow);
        }
        else{
            setWicon(clear);
        }
    }

    return(
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='Search'></input>
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={search} alt=""/>
                </div> 
            </div>
            <div className="weather-image">
                <img src={wicon} alt=""/>
            </div>
            <div className='weather-temp'>24c</div>
            <div className="weather-location">London,UK</div>
            <div className="data-container">
                <div className='element'>
                    <img src="humidity-percent" alt="" className="icon" />
                    <div className='data'>
                        <div className='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>

                <div className='element'>
                    <img src={wind} alt="" className="icon" />
                    <div className='data'>
                        <div className='wind-rate'>18kmph</div>
                        <div className='text'>Wind speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp