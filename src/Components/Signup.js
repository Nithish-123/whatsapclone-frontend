import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/signup.css";
import errorhandler from "../Errorhandlers/errorhandler";
import { useForm } from "react-hook-form";

function Signup() {
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm();

	const signup = async (data) => {
		const { email, username, password } = data;
		let user = await fetch("http://localhost:3001/user/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});
		user = await user.json();

		if (user.message) {
			const signuperror = user.message;
			if (signuperror.keyValue && signuperror.keyValue.username)
				return errorhandler("!!username already exists");
			else if (signuperror.keyValue && signuperror.keyValue.email)
				return errorhandler("!!email in use");
		}
		localStorage.setItem("whatsap-token", user.token);
		history.push({ pathname: "./chatroom", state: { user } });
	};

	return (
		<form onSubmit={handleSubmit(signup)}>
			<div className="signup_page">
				<div className="signup_container">
					<h1 className="heading_name">Sign up</h1>
					<input
						className="inputfield"
						placeholder="Enter UserName"
						name="username"
						ref={register({ required: true })}
					></input>
					{errors.username && (
						<span className="error_message">UserName is required</span>
					)}
					<input
						className="inputfield"
						placeholder="Enter Email"
						name="email"
						ref={register({
							required: true,
							pattern: {
								value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								message: "invalid email",
							},
						})}
					></input>
					{errors.email && (
						<span className="error_message">{errors.email.message}</span>
					)}
					<input
						className="inputfield"
						type="password"
						placeholder="Enter password"
						name="password"
						ref={register({
							required: "pasword required",
							minLength: { value: 8, message: "minimum 8 characters" },
						})}
					></input>
					{errors.password && (
						<span className="error_message">{errors.password.message}</span>
					)}
					<button className="login_button" type="submit">
						Sign Up
					</button>
				</div>
			</div>
		</form>
	);
}
export default Signup;
