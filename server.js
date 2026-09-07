const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.listen(PORT, () => {
    console.log(`השרת רץ על http://localhost:${PORT}`);
});