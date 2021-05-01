import React, { useEffect, useState } from "react";
import WeatherComponent from "../pages/WeatherComponent";

const fetchWeather = async () => {
	const res = await fetch("http://localhost:5000/weather");
	const data = await res.json();
	console.log(data);
	return data;
};

export const Weather = () => {
	const [forecast, setforecast] = useState([]);
	useEffect(() => {
		setforecast(fetchWeather());
	}, []);
	console.log("hihi");
	return (
		<div>
			<WeatherComponent forecast={forecast[0]}>Hihgerthedh</WeatherComponent>
		</div>
	);
};
