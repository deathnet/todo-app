import React, { useEffect } from "react";

export const Weather = () => {
	useEffect(() => {
		const fetchWeather = async () => {
			const res = await fetch("http://localhost:5000/weather");
			const data = await res.json();
			console.log(data);
		};
		fetchWeather();
	}, []);
	// const loc = navigator.geolocation();
	return (
		<div>
			
		</div>
	);
};
