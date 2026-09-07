const express = require('express');
const router = express.Router();
let books = [
    { 
        id: 1, 
        title: "מהלאלהל", 
        author: "מיה קינן",
        isAvailable: true,
        loans: []
    },
    { 
        id: 2, 
        title: "דודי ואודי", 
        author: "שרה לאון",
        isAvailable: true,
        loans: []
    }
];
//GET
router.get('/', (req, res) => {
    res.json(books);
});

//GET ID
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר זה לא קיים במערכת" });
    res.json(book);
});

//POST-הוספה
router.post('/', (req, res) => {
    const newBook = {
        id:          books.length + 1,
        title:       req.body.title,
        author:      req.body.author,
        isAvailable: true,
        loans:       []
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT -עדכון
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר לא נמצא" });
    book.title  = req.body.title;
    book.author = req.body.author;
    res.json(book);
});
// DELETE—מחיקה
router.delete('/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.json({ message: "ספר נמחק בהצלחהה" });
});

// POST-השאלה 
router.post('/:id/loan', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message:  " במערכץ ספר לא נמצא" });
    if (!book.isAvailable)
        return res.status(400).json({ message: "הספר כבר מושאל" });

    const loan = {
        userId:   req.body.userId,
        loanDate: new Date().toISOString().split('T')[0]
    };
    book.loans.push(loan);
    book.isAvailable = false;
    res.status(201).json({ message: "!!הספר הושאל בהצלחה", loan });
});

// PUT — החזרת ספר
router.put('/:id/return', (req, res) =>
     {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book)
        return res.status(404).json({ message: "ספר לא נמצא" });
    if (book.isAvailable)
        return res.status(400).json({ message: "הספר לא מושאל בכלל" });
    book.isAvailable = true;
    book.loans = [];

    res.json({ message: "הספר הוחזר בהצלחה", book });
});
