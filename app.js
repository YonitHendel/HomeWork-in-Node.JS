const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');   
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(logger);                                 

const booksRouter = require('./routes/book.route');
const usersRouter = require('./routes/user.route');

app.use('/books', booksRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
 console.log(`השרת רץ על http://localhost:${PORT}`);
});