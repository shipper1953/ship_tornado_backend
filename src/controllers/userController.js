exports.getProfile = async (req, res) => {
    try {
      const user = req.user; // Attached by authMiddleware
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  };
  