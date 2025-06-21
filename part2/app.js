// API: Get dogs for logged-in owner
app.get('/api/dogs', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(403).send('Forbidden');
  }

  db.query('SELECT dog_id, name FROM dogs WHERE owner_id = ?', [req.session.user.id], (err, results) => {
    if (err) return res.status(500).send('DB error');
    res.json(results);
  });
});


// ✅ Add walk request route
app.post('/api/walks', (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== 'owner') {
    return res.status(403).send('Forbidden');
  }

  const { dog_id, requested_time, duration, location } = req.body;
  const status = 'open';

  db.query(
    'INSERT INTO walks (dog_id, requested_time, duration, location, status) VALUES (?, ?, ?, ?, ?)',
    [dog_id, requested_time, duration, location, status],
    (err, result) => {
      if (err) return res.status(500).send('Database error');
      res.json({ success: true, id: result.insertId });
    }
  );
});


// ✅ Get all walk requests for the owner
app.get('/api/my-walks', (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== 'owner') {
    return res.status(403).send('Forbidden');
  }

  db.query(
    `SELECT w.*, d.name AS dog_name, d.size
     FROM walks w
     JOIN dogs d ON w.dog_id = d.dog_id
     WHERE d.owner_id = ?
     ORDER BY w.request_id DESC`,
    [user.id],
    (err, results) => {
      if (err) return res.status(500).send('DB error');
      res.json(results);
    }
  );
});


// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
