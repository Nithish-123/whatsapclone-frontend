import React, { useEffect, useState } from "react";
import "../css/rightside.css";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useForm } from "react-hook-form";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";

function Mainbody(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { register, handleSubmit, errors } = useForm();
	const [messages, setMessages] = useState([]);
	const history = useHistory();
	const { id, username } = useParams();
	const owner = props.userprofile.username;
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		localStorage.setItem("whatsap-user", "");
		localStorage.setItem("whatsap-token", "");
		history.push("/");
		window.location.reload();
	};
	const token = localStorage.getItem("whatsap-token");

	const messagefunc = (params) => {
		const message = {
			message: params.message_info,
			groupname: username,
			sender: props.userprofile.username,
			userid: props.userprofile._id,
			friendid: id,
		};
		props.message(message);
	};
	const scrolldown = () => {
		const messagecontainer = document.querySelector(".chat_body");
		messagecontainer.scrollTop = messagecontainer.scrollHeight;
	};

	useEffect(() => {
		const getmessages = async () => {
			let messagesarr = await fetch(
				`https://nithish-whatsapclone.herokuapp.com/messages/get/${username}`,

				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userid: props.userprofile._id,
						friendid: id,
						username: props.userprofile.username,
					}),
				}
			);
			messagesarr = await messagesarr.json();
			setMessages(messagesarr);
			scrolldown();
		};
		getmessages();
	}, []);
	useEffect(() => {
		if (Object.keys(props.newmessage).length !== 0) {
			console.log(messages);
			setMessages([...messages, props.newmessage]);
		}
	}, [props.newmessage]);
	return (
		<>
			<div className="right_side">
				<div className="header_right">
					<Avatar></Avatar>
					<h1 className="groupname_friend">{username}</h1>
					<div>
						<Button
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MenuIcon></MenuIcon>
						</Button>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</div>
				<div className="chat_body">
					{messages.length > 0 &&
						messages.map((ele) => (
							<div
								className={`messages ${
									ele.sender.includes(owner) && `chat_receiver`
								}`}
							>
								<div className="mt">
									<span className="name">{ele.sender}</span>
									<span className="timestamp">{ele.createdAt}</span>
								</div>
								<p className="message">{ele.message}</p>
							</div>
						))}
				</div>
				<div className="chat_footer">
					<InsertEmoticonIcon
						style={{ height: "20px", width: "20px" }}
					></InsertEmoticonIcon>
					<form onSubmit={handleSubmit(messagefunc)}>
						<input
							placeholder="Type Something..."
							name="message_info"
							className="inputfield_message"
							ref={register({ required: true })}
						></input>
						{errors.message_info && true}
						<button type="submit">
							<SendIcon style={{ color: "#128c7e" }}></SendIcon>
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Mainbody;

/* import React, { useEffect, useState } from "react";
import "../css/rightside.css";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useForm } from "react-hook-form";
import { useParams, Link, useHistory, Redirect } from "react-router-dom";

function Mainbody(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { register, handleSubmit, errors } = useForm();
	const [messages, setMessages] = useState([]);
	const { id, username } = useParams();
	const history = useHistory();
	const owner = props.userprofile.username;
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};


	const token = localStorage.getItem("whatsap-token");
	const messagefunc = (params) => {
		const message = {
			message: params.message_info,
			groupname: props.det2,
			sender: props.userprofile.username,
			userid: props.userprofile._id,
			friendid: props.det1,
		};
		props.message(message);
		delete message.friendid;
		setMessages(...messages, message);
	};
	const scrolldown = () => {
		const messagecontainer = document.querySelector(".chat_body");
		messagecontainer.scrollTop = messagecontainer.scrollHeight;
	};

	useEffect(() => {
		const getmessages = async () => {
			let messagesarr = await fetch(
				`http://localhost:3001/messages/get/${username}`,

				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userid: props.userprofile._id,
						friendid: id,
						username: props.userprofile.username,
					}),
				}
			);
			messagesarr = await messagesarr.json();
			setMessages(messagesarr);
			alert("hi");
			scrolldown();
		};
		 getmessages();
	}, []);
	useEffect(() => {
		if (Object.keys(props.newmessage).length !== 0) {
			console.log(messages);
			setMessages(...messages, props.newmessage);
		}
	}, [props.newmessage]);

	return (
		<>
			<div className="right_side">
				<div className="header_right">
					<Avatar></Avatar>
					<h1 className="groupname_friend">{username}</h1>
					<div>
						<Button
							aria-controls="simple-menu"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MenuIcon></MenuIcon>
						</Button>
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</div>
				<div className="chat_body">
					{messages.lemgth > 0 &&
						messages.map((ele) => (
							<div
								className={`messages ${
									ele.sender.includes(owner) && `chat_receiver`
								}`}
							>
								<div className="mt">
									<span className="name">{ele.sender}</span>
									<span className="timestamp">{ele.createdAt}</span>
								</div>
								<p className="message">{ele.message}</p>
							</div>
						))}
				</div>
				<div className="chat_footer">
					<InsertEmoticonIcon
						style={{ height: "20px", width: "20px" }}
					></InsertEmoticonIcon>
					<form onSubmit={handleSubmit(messagefunc)}>
						<input
							placeholder="Type Something..."
							name="message_info"
							className="inputfield_message"
							ref={register({ required: true })}
						></input>
						{errors.message_info && true}
						<button type="submit">
							<SendIcon style={{ color: "#128c7e" }}></SendIcon>
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Mainbody;
 */
