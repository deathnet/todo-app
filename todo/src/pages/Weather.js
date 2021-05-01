import React, { useEffect, useState } from "react";
import { WeatherComponent } from "./WeatherComponent";

/**
 * convert (lon, lat) => (X, Y)
 */
const calculateCooldinates = (lon, lat) => {

	let lon1, lat1, x1, y1, x, y;

	lon1 = lon;
	lat1 = lat;
	const calxy = lamcproj(lon1, lat1, x1, y1);
	x = calxy.x1 + 1.5;
	y = calxy.y1 + 1.5;
	return ({ x: x, y: y });
};

function lamcproj(lon, lat) {

	let PI, DEGRAD;
	let re, olon, olat, sn, sf, ro;
	let slat1, slat2, ra, theta;
	let x, y;

	PI = Math.asin(1.0) * 2.0;
	DEGRAD = PI / 180.0;

	re = 6371.00877 / 5.0;
	slat1 = 30.0 * DEGRAD;
	slat2 = 60.0 * DEGRAD;
	olon = 126.0 * DEGRAD;
	olat = 38.0 * DEGRAD;

	sn = Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
	sn = Math.log(Math.cos(slat1) / Math.cos(slat2) / Math.log(sn));
	sf = Math.tan(PI * 0.25 + slat1 * 0.5);
	sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
	ro = Math.tan(PI * 0.25 + olat * 0.5);
	ro = re * sf / Math.pow(ro, sn);

	ra = Math.tan(PI * 0.25 + lat * DEGRAD * 0.5);
	ra = re*sf / Math.pow(ra, sn);
	theta = lon * DEGRAD - olon;
	if (theta > PI) { theta -= 2.0 * PI; }
	if (theta < -PI) { theta += 2.0 * PI; }
	theta *= sn;
	x = (ra * Math.sin(theta)) + (210 / 5.0);
	y = (ro - ra * Math.cos(theta)) + (675 / 5.0);
	return ({ x1: x, y1: y });
}

const fetchWeather = async (nx, ny) => {
	const res = await fetch(`http://localhost:5000/weather?nx=${nx}&ny=${ny}`);
	const data = await res.json();
	return data;
};

// Geolocation object
const geoAPI = navigator.geolocation;

function initforecast(setLoading, setforecast) {
	geoAPI.getCurrentPosition(async (position) => {
		const Coordinates = calculateCooldinates(position.coords.longitude, position.coords.latitude);
		await fetchWeather(Coordinates.x, Coordinates.y).then((data) => {
			setforecast(data);
		});
		setLoading(false);
	});
}

export const Weather = () => {
	const [loading, setLoading] = useState(true);
	const [forecast, setforecast] = useState([]);
	useEffect(() => {
		function first() {
			initforecast(setLoading, setforecast);
		}
		first();
	}, []);
	if (loading) return <div>Loading...</div>;

	const arrToComponent = (data) => {
		return data.map((component, i) => {
			return (<WeatherComponent forecast={component} key={i}></WeatherComponent>);
		});
	};

	return (
		<div>
			{arrToComponent(forecast)}
		</div>
	);
};