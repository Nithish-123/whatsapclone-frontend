import React, { useState, useEffect } from "react";
import "./css/homepage.css";
import { Link, useHistory } from "react-router-dom";
import errorhandler from "../Errorhandlers/errorhandler";
import { useForm } from "react-hook-form";
function Homepage() {
	const { register, handleSubmit, errors } = useForm();
	const history = useHistory();

	/* const reloadprevent = () => {
		const token = localStorage.getItem("whatsap-token");
		if (token) {
			const user = JSON.parse(localStorage.getItem("whatsap-user"));
			history.push({ pathname: "./chatroom", state: user });
		}
	};
	reloadprevent(); */

	const loginrequest = async (data) => {
		localStorage.setItem("whatsap-token", "");
		const { email, password } = data;
		/* console.log(data); */
		if (data) {
			let user = await fetch(
				"https://nithish-whatsapclone.herokuapp.com/user/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password }),
				}
			);
			user = await user.json();

			if (user.message) {
				errorhandler(user.message);
				return;
			}
			localStorage.setItem("whatsap-user", JSON.stringify(user.user));
			localStorage.setItem("whatsap-token", user.token);
			console.log(user.user);
			history.push({ pathname: "./chatroom", state: user.user });
		}
	};

	return (
		<form onSubmit={handleSubmit(loginrequest)}>
			<div className="homepage_container">
				<div className="homepage_login_form">
					<h1 className="heading_name">Login</h1>
					<h3>Enter email</h3>
					<input
						className="inputfield email"
						name="email"
						ref={register({
							required: "email required",
							pattern: {
								value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								message: "invalid email",
							},
						})}
					></input>
					{errors.email && (
						<span className="error_message">{errors.email.message}</span>
					)}

					<h3>Enter password</h3>
					<input
						className="inputfield password"
						type="password"
						name="password"
						ref={register({
							required: "password required",
							minLength: { value: 8, message: "minlength is 8 " },
						})}
					></input>
					{errors.password && (
						<span className="error_message">{errors.password.message}</span>
					)}

					<button className="login_button" type="submit">
						Login
					</button>

					<div className="signup_link">
						<h3>Not registered?</h3>
						<Link to={`/signup`}>Signup</Link>
					</div>
				</div>
			</div>
		</form>
	);
}

export default Homepage;
