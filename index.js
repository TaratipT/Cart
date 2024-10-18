const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const dbPath = path.resolve(__dirname, 'itfoodflow.db');
const db = new sqlite3.Database(dbPath);

app.use(express.static('public')); // to serve static files

// API to get menu items
app.get('/menu', (req, res) => {
  const query = 'SELECT userID, menuID, menuName, menuPrice, menuPicture FROM cart JOIN menu USING (menuID);';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      data: rows
    });
  });
});

// Add this route to handle deleting a menu item from the database
app.delete('/menu/:id', (req, res) => {
  const menuID = req.params.id;
  const query = 'DELETE FROM menu WHERE menuID = ?';

  db.run(query, [menuID], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Menu item deleted successfully' });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
