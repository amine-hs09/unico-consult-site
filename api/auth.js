export function POST(req, res) {
  const { email, password } = req.body || {};

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Create a simple token: base64 of JSON with expiry (24h)
  const expiry = Date.now() + 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ email, exp: expiry, iat: Date.now() });
  const token = Buffer.from(payload).toString('base64');

  return res.status(200).json({ token });
}
