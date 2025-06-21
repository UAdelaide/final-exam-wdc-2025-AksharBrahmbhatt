const db = require('../db');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.execute(
      'SELECT * FROM Users WHERE username = ? AND password_hash = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    // Simulate session: return role
    res.json({ success: true, role: user.role });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
