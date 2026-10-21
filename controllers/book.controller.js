let books = require('../data/books.json');
const users = require('../data/users.json');

//GET ID
const getBookById = (req, res) => {                         
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר זה לא קיים במערכת" });
    res.json(book);
};                                                          

//POST-הוספה
const addBook = (req, res) => {                              
    const newBook = {
        id:          books.length + 1,
        title:       req.body.title,
        author:      req.body.author,
        isAvailable: true,
        loans:       []
    };
    books.push(newBook);
    res.status(201).json(newBook);
};                                                           

// PUT -עדכון
const updateBook = (req, res) => {                            
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר לא נמצא" });
    book.title  = req.body.title;
    book.author = req.body.author;
    res.json(book);
};                                                           

// DELETE—מחיקה
const deleteBook = (req, res) => {                            
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.json({ message: "ספר נמחק בהצלחה" });
};                                                           

// POST-השאלה 
const loanBook = (req, res) => {                              
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר לא נמצא במערכת" });
    if (!book.isAvailable)
        return res.status(400).json({ message: "הספר כבר מושאל" });

    const loan = {
        userId:   req.body.userId,
        loanDate: new Date().toISOString().split('T')[0]
    };
    book.loans.push(loan);
    book.isAvailable = false;

    const user = users.find(u => u.id === req.body.userId); 
    if (user) user.books.push(book.id);                        

    res.status(201).json({ message: "!!הספר הושאל בהצלחה", loan });
};                                   
// PUT — החזרת ספר
const returnBook = (req, res) => {                           
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר לא נמצא" });
    if (book.isAvailable)
        return res.status(400).json({ message: "הספר לא מושאל בכלל" });

    const user = users.find(u => u.id === book.loans[0].userId);     
    if (user) user.books = user.books.filter(id => id !== book.id);   

    book.isAvailable = true;
    book.loans = [];

    res.json({ message: "הספר הוחזר בהצלחה", book });
};                                                            

//קבלת כל הספרים
const getAllBooks = (req, res) => {                           
    const page   = parseInt(req.query.page)   || 1;
    const limit  = parseInt(req.query.limit)  || 2;
    const search = req.query.search           || '';

    let results = books.filter(b => b.title.includes(search));

    const startIndex = (page - 1) * limit;
    const endIndex   = startIndex + limit;
    const paginated  = results.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        total: results.length,
        books: paginated
    });
};                                                            

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook, loanBook, returnBook };   // ← חדש