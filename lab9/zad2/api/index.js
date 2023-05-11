const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://db:27017/local', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
});

const User = mongoose.model('User', UserSchema);

app.get('/users', async (req, res) => {
	const user = await User.find();
	res.send(user);
});

app.post('/users', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
