import { Avatar } from "@material-ui/core";
import React from "react";
import "../css/sidebar.css";
import { Link } from "react-router-dom";
function Sidebar(props) {
	/* console.log(props.friendsdetails); */

	return (
		<Link
			className="sidebar_link"
			to={`/chatroom/chatsec/${props.friendsdetails.username}/${props.friendsdetails._id}`}
		>
			<div className="sidebar_list">
				<Avatar style={{ height: "60px", width: "60px" }}></Avatar>
				<div className="user_details">
					<h2>{props.friendsdetails.username}</h2>
					<p>lastmessage</p>
				</div>
			</div>
		</Link>
	);
}

export default Sidebar;
