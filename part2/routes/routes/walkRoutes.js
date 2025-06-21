// GET /api/dogs - Return dogs owned by the logged-in owner
router.get('/dogs', async (req, res) => {
  const user = req.session.user;
  if (!user || user.role !== 'owner') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const [rows] = await db.query(
      'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
      [user.id]
    );
    res.json(rows); // e.g. [{ dog_id: 1, name: "Buddy" }]
  } catch (err) {
    console.error('DB error fetching dogs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
