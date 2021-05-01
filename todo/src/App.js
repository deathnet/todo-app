import { Todomain } from "./view/Todo_main";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { About } from "./pages";
import { BrowserRouter } from "react-router-dom";
import { Weather } from "./pages/Weather";
import "./App.css";

function App() {
  return (
		<BrowserRouter>
			<div className="App">
				<Switch>
					<Route exact path="/" component={Todomain} />
					<Route path="/About" component={About} />
					<Route path="/Weather" component={Weather} />
				</Switch>
			</div>
		</BrowserRouter>
  );
}

export default App;
