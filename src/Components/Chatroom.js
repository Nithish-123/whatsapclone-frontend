import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	BrowserRouter as Router,
	useLocation,
	useHistory,
	Route,
	Switch,
} from "react-router-dom";
import "./css/chatroom.css";
import Leftside from "./chat-components/Leftside";
import Rightside from "./chat-components/Rightside";
import io from "socket.io-client";

function Chatroom(props) {
	const [friendsarr, setFriendsarr] = useState([]);
	const [isrender, SetIsrender] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const [messageformat, setMessageformat] = useState({});
	const endpoint = "http://localhost:3001";
	const [recentmessage, setRecentmessage] = useState({});
	if (!location.state) {
		history.push("/");
	}
	const socket = io(endpoint);
	const token = localStorage.getItem("whatsap-token");
	const addfriend = async (friend) => {
		let addedfriend = await fetch("/addfriend", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: friend }),
		});
		addedfriend = await addedfriend.json();
		if (addedfriend.message) alert(addedfriend.message);
		else window.location.reload();
	};
	const messagedetails = (params) => {
		console.log(params);
		setMessageformat(params);
	};
	useEffect(() => {
		const getfriendsdet = async () => {
			let friendsarrdet = await fetch("/addfriends", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			friendsarrdet = await friendsarrdet.json();
			setFriendsarr(friendsarrdet);
			/* console.log(friendsarr); */
			SetIsrender(true);
		};
		if (location.state && location.state.groups.length > 0) {
			getfriendsdet();
		} else SetIsrender(true);
	}, []);

	useEffect(() => {
		if (location.state)
			socket.on("connect", () => {
				socket.emit("clientsidejoined", location.state._id);
			});
	}, [endpoint]);

	useEffect(() => {
		if (Object.keys(messageformat).length !== 0)
			socket.emit("chat-message", messageformat, () => {
				delete messageformat.friendid;
				setRecentmessage(messageformat);
			});
		if (location.state)
			socket.on(`${location.state._id}`, (message1) => {
				console.log(message1);

				setRecentmessage(message1);
			});
		socket.on("testing", (testing) => {
			console.log(testing);
		});
	}, [messageformat]);

	return (
		<div className="chatpage">
			{location.state && (
				<React.Fragment>
					<Router>
						{isrender && (
							<Leftside
								friend={location.state}
								listfriends={friendsarr}
								addfriends={addfriend}
							></Leftside>
						)}

						<Route
							path="/chatroom/chatsec/:username/:id"
							component={(props) => (
								<Rightside
									{...props}
									key={window.location.pathname}
									userprofile={location.state}
									message={messagedetails}
									newmessage={recentmessage}
								></Rightside>
							)}
						></Route>
					</Router>
				</React.Fragment>
			)}
		</div>
	);
}

export default Chatroom;
