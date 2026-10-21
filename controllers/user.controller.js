const users = require('../data/users.json');

// הצגת כל המשתמשים
const getAllUsers = (req, res) => {
    res.json(users);
};

// הרשמה
const signUp = (req, res) => {
    const newUser = {
        id:       users.length + 1,
        name:     req.body.name,
        email:    req.body.email,
        password: req.body.password,
        books:    []
    };
    users.push(newUser);
    res.status(201).json(newUser);
};

// התחברות
const signIn = (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password == req.body.password);
    if (!user)
        return res.status(401).json({ message: "אימייל או סיסמה שגויים" });
    res.json({ message: "התחברת בהצלחה", user });
};

module.exports = { getAllUsers, signUp, signIn };