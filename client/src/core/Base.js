import React from "react";

const Base = ({ children }) => (
	<div className="container">
				<div className="row">
					<div className="col h1" style={{ backgroundColor: "#E71C23", textAlign: "center",color:"#FFF222"}}>Phonebook</div>
				</div>
				<br/>
				{/* <div style={{ backgroundColor: "yellow", textAlign: "center"}}>
					<span className="h1">Phonebook</span>
				</div> */}
		{children}
	
	</div>
);
export default Base;
