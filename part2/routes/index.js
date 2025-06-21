app.get('/api/dogs', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const sql = 'SELECT dog_id, name FROM dogs WHERE owner_id = ?';
  db.query(sql, [req.session.user.user_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});
