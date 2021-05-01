import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";

const Style = {
	fontSize: "2rem",
	maxWidth: "20%",
	padding: "5px",
	display: "inline-block",
	height: "400px",
	textAlign: "center",
};

export const WeatherComponent = ({forecast}) => {
	console.log("component forecast: ", forecast);
	let fcstTime = forecast.fcstTime || "Not Yet1";
	let fcstValue = forecast.fcstValue || "Not Yet2";
	return (
		<div className="WeatherComponent" style={Style}>
			<FontAwesomeIcon icon={faSun} />
			<p>{fcstTime}</p>
			<p>{fcstValue}&#8451;</p>
		</div>
	);
};

WeatherComponent.propTypes = {
	forecast: PropTypes.object,
};