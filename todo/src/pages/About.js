import React from "react";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div>
			<p>made by jongkim<br/>2021-03-30 Version 1.0.0</p>
			<Link to="/"><span>Go back</span></Link>
		</div>
	);
};

export default About;