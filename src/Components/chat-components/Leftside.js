import React, { useState, useEffect } from "react";
import "../css/leftside.css";
import "../css/sidebar.css";
import Sidebar from "../chat-components/Sidebar";
import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { v4 as uuidv4, v4 } from "uuid";
import { useForm } from "react-hook-form";

function Header(props) {
	const [groups, setGroups] = useState([]);
	const { register, handleSubmit, errors } = useForm();
	let grouparr;
	useEffect(() => {
		if (props.friend.groups.length > 0) {
			grouparr = props.listfriends.map((ele) => ele);
			setGroups(grouparr);
		}
	}, []);

	const toggle = () => {
		const val = document.querySelector(".insert_user");
		val.classList.toggle("show");
	};
	const addfriendlist = (username) => {
		props.addfriends(username.friend_username);
	};

	return (
		<div className="leftside_header">
			<div className="header_left">
				<Avatar></Avatar>
				<h1>{props.friend.username}</h1>
				<div className="add_group_div">
					<button className="add_group" onClick={toggle}>
						<AddIcon></AddIcon>
					</button>
					<form onSubmit={handleSubmit(addfriendlist)}>
						<div className="insert_user">
							<input
								name="friend_username"
								type="text"
								placeholder="Enter username"
								ref={register()}
							></input>
							<button className="add_user" type="submit">
								Add
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="sidebar">
				<ul>
					{groups.length > 0 ? (
						groups.map((ele) => (
							<li>
								<Sidebar key={ele._id} friendsdetails={ele}></Sidebar>
							</li>
						))
					) : (
						<h3>Chat with friends</h3>
					)}
				</ul>
				{/* <Sidebar></Sidebar>
					<Sidebar></Sidebar> */}
			</div>
		</div>
	);
}

export default Header;
