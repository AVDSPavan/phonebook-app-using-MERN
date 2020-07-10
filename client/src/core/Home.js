import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
export const Home = () => {
	const [data, setData] = useState([]);
	const [reload, setReload] = useState(false);
	const [search, setSearch] = useState("");
	const [filteredContacts, setFilteredContacts] = useState([]);
	const getAll = () => {
		return fetch("http://localhost:8000/", { method: "GET" }).then((data) => {
			return data.json();
		});
	};
	useEffect(()=>{
		getAll().then((data) => setData(data));
	},[reload])

	useEffect(() => {
				setFilteredContacts(data.filter((data) =>data.name.toLowerCase().includes(search.toLowerCase())))
		}, [search,data]);

	const deleteContact = (id) => {
		return fetch(`http://localhost:8000/${id}/`, {
			method: "DELETE"
		}).then((data) => {
			setReload(!reload);
			return data;
		});
	};
	return (
		<Base>
			<div className="container">
				<div className="row form" style={{ alignContent: "center" }}>
					<input
						className="form-control"
						type="text"
						placeholder="Search"
						onChange={(e) => {setSearch(e.target.value)}}
					/>
				</div>
				<br />
				<div className="row">
					<div className="col-md">
						<div className="table-responsive">
							<table className="table table-dark mycontacts">
								<thead style={{ textAlign: "center" }}>
									<tr>
										<td className="h4">Name</td>
										<td className="h4">Mobile</td>
										<td className="h4">Email</td>
										<td className="h4">Options</td>
									</tr>
								</thead>
								<tbody style={{ textAlign: "center" }}>
									{filteredContacts.map((contact, index) => {
										return (
											<tr key={index}>
												<td>{contact.name}</td>
												<td>{contact.mobile}</td>
												<td>{contact.email}</td>
												<td>
													<span
														className="btn btn-danger m-1"
														onClick={() => deleteContact(contact._id)}>
														Delete
													</span>
													<Link to={`/update/${contact._id}`}>
														<span className="btn btn-success">Update</span>
													</Link>
												</td>
											</tr>
										);
									})}
									<tr>
										<td>
											<Link to="/create">
												<span className="btn btn-success">Create</span>
											</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</Base>
	);
};