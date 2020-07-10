import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";

export const Create = () => {
	const [data, setData] = useState({
		name: "",
		mobile: "",
		email: "",
		error: "",
		success: false,
	});
	const [reload, setReload] = useState("false");

	const { name, email, mobile, error, success } = data;
	const handleChange = (name) => (event) => {
		setData({ ...data, error: "", [name]: event.target.value });
	};

	useEffect(() => {}, [reload]);

	const createContact = (contact) => {
		return fetch("http://localhost:8000/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(contact),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}>
						Contact added successfully.
						<Link to="/">Click here to go to Phonebook</Link>
					</div>
				</div>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setData({ ...data, error: "" });
		createContact({ name, mobile, email })
			.then((res) => {
				if (res.error) {
					setData({ ...data, error: res.error });
				} else {
					console.log(`Contact name : ${name} is created Succesfully`);
					setData({
						...data,
						name: "",
						mobile: "",
						email: "",
						error: "",
						success: true,
					});
				}
				setReload(!reload);
			})
			.catch((err) => console.log(err));
	};

	return (
		<Base>
			<div className="container">
				<Link to="/">
					<span className="btn btn-info" style={{ padding: "1% 2%" }}>
						Home
					</span>
				</Link>
				<div className="row">
					<div className="col-md-6 offset-sm-3 text-left">
						<form>
							<div className="form-group">
								<input
									onChange={handleChange("name")}
									value={name}
									placeholder="Name"
									className="form-control"
									type="text"
								/>
							</div>

							<div className="form-group">
								<input
									onChange={handleChange("mobile")}
									value={mobile}
									placeholder="Mobile number"
									className="form-control"
									type="text"
								/>
							</div>
							<div className="form-group">
								<input
									onChange={handleChange("email")}
									value={email}
									placeholder="Email"
									className="form-control"
									type="email"
								/>
							</div>
							<button onClick={onSubmit} className="btn btn-success btn-block">
								Create
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className="container-small">
				{successMessage()}
				{errorMessage()}
			</div>
		</Base>
	);
};
