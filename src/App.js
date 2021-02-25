import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Chatroom from "./Components/Chatroom";
import Signup from "./Components/Signup";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
function App() {
	return (
		<div className="App">
			<div className="App_container1">
				<figure className="app_logo">
					<WhatsAppIcon style={{ fontSize: 65 }}></WhatsAppIcon>
				</figure>
			</div>

			<Router>
				<Route path="/" exact component={Homepage}></Route>
				<Route path="/signup" component={Signup}></Route>
				<Route path="/chatroom" component={Chatroom}></Route>
			</Router>
		</div>
	);
}

export default App;
