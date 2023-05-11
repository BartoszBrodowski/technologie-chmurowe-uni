const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
	{ id: 1, title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling' },
	{ id: 2, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
	{ id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
	{ id: 4, title: '1984', author: 'George Orwell' },
];

app.get('/books', (req, res) => {
	res.json(books);
});

app.get('/books/:id', (req, res) => {
	const book = books.find((book) => book.id === parseInt(req.params.id));
	if (!book) {
		return res.status(404).send('Book not found');
	}
	res.json(book);
});

// Endpoint POST /books dodaje nową książkę do listy
app.post('/books', (req, res) => {
	const { title, author } = req.body;
	const id = books.length + 1;
	const newBook = { id, title, author };
	books.push(newBook);
	res.json(newBook);
});

app.put('/books/:id', (req, res) => {
	const book = books.find((book) => book.id === parseInt(req.params.id));
	if (!book) {
		return res.status(404).send('Book not found');
	}
	book.title = req.body.title || book.title;
	book.author = req.body.author || book.author;
	res.json(book);
});

app.delete('/books/:id', (req, res) => {
	const bookIndex = books.findIndex((book) => book.id === parseInt(req.params.id));
	if (bookIndex === -1) {
		return res.status(404).send('Book not found');
	}
	books.splice(bookIndex, 1);
	res.sendStatus(204);
});

app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});
