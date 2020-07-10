require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { check, validationResult } = require("express-validator");

//Get all contacts
router.get("/", (req, res) => {
	User.find().exec((err, contacts) => {
		if (err) {
			return res.status(400).json({
				error: "No contacts found",
			});
		}
		return res.json(contacts);
	});
});

//Create new contact
router.post(
	"/",
	[
		check("name", "Contact name should be at least 3 characters").isLength({
			min: 3,
		}),
		check("email", "Email is required").isEmail(),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ error: errors.array()[0].msg });
		}
		const user = new User(req.body);
		user.save((error, user) => {
			if (error) {
				return res.json({
					error: "Contact Name or Mobile or Email already exists",
				});
			}
			return res.json({ name: user.name, email: user.email, error: false });
		});
	}
);

router.param("id", (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err) {
			return res.status(400).json({
				error: "No user was found in DB",
			});
		}
		req.profile = user;
		next();
	});
});

//Get a contact using contact_id
router.get("/user/:id", (req, res) => {
	return res.json(req.profile);
});
//Delete a contact using id
router.delete("/:id", (req, res) => {
	User.findByIdAndDelete(req.profile._id).exec((err, contact) => {
		if (err) {
			console.log("Error to delete");
			return res.status(400).json({
				error: "Unable to delete contact",
			});
		}
		console.log("Deleted");
		return res.json({
			message: "Deleted succesfully",
			contact: contact,
		});
	});
});

//Update a contact
router.put("/:id", (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				return res.status(400).json({
					error: "Not able to update",
				});
			}
			res.json(user);
		}
	);
});

module.exports = router;
