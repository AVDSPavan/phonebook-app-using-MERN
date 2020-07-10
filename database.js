const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose
		.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => {
			console.log("DB CONNECTED");
		});
};

module.exports = connectDB;
