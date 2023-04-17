const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
	.connect('mongodb://db:27019/local', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Połączono z bazą danych');
	})
	.catch((err) => {
		console.log('Błąd połączenia z bazą danych', err);
	});

const db = mongoose.connection;

app.get('/users', async (req, res) => {
	const result = await db.collection('users').find().toArray();
	res.send(result);
	return result;
});

app.listen(3000, () => {
	console.log('Serwer działa na porcie 3000');
});
