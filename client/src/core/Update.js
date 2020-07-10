import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";

export const Update = ({ match }) => {
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
	const getContact = (id) => {
		return fetch(`http://localhost:8000/user/${id}`, {
			method: "GET",
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		return getContact(match.params.id).then((res) => {
				const { name, email, mobile } = res;
				setData({ name: name, email: email, mobile: mobile });
			})
	}, [reload]);

	const updateContact = (id, contact) => {
		return fetch(`http://localhost:8000/${id}`, {
			method: "PUT",
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
						Contact successfully updated.
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
		updateContact(match.params.id, { name, mobile, email })
			.then((res) => {
				if (res.error) {
					setData({ ...data, error: res.error });
				} else {
					console.log(`Contact name : ${name} is updated Succesfully`);
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
					<span className="btn btn-outline-info" style={{ padding: "1% 2%" }}>
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
								Update
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
