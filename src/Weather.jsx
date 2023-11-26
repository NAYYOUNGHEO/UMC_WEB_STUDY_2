import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css'

function Weather() {
  const [city, setCity] = useState(''); // 사용자 입력을 위한 상태
  const [weather, setWeather] = useState(null); // 날씨 데이터를 위한 상태
  const [error, setError] = useState(''); // 에러 메시지 상태

  const fetchWeather = async () => {
    setError(''); // 에러 상태 초기화
    try {
      const apiKey = "4e422f29cf779dbf482adac0751ae403"; // 실제 애플리케이션에서는 환경 변수에서 가져오는 것이 좋습니다.
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeather(response.data); // 날씨 데이터 상태를 업데이트
    } catch (error) {
      setError('날씨 정보를 가져오는 데 실패했습니다'); // 사용자에게 에러 메시지 표시
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value); // 입력값에 따라 city 상태를 업데이트
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(); // 엔터를 누르면 날씨 정보를 가져옵니다.
    }
  };

  // 날씨 데이터가 없을 때 사용자에게 입력을 유도하는 메시지를 표시
  if (!weather) {
    return (
      <div>
        <input className='inputBox'
          type="text"
          placeholder="도시를 입력하세요"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }

  // 날씨 데이터가 있을 때 날씨 정보를 표시
  return (
    <div>
      <input className='inputBox'
        type="text"
        placeholder="도시를 입력하세요"
        value={city}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {weather && (
        <div className='weatherBox'>
          <p className='name'>{weather.name}</p>
          <p className='temperature'>{(weather.main.temp - 273.15).toFixed(2)}°C</p> {/* 켈빈을 섭씨로 변환 */}
          <p className='weather'>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
