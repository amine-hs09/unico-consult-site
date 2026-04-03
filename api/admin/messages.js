import { put, head } from '@vercel/blob'

const BLOB_KEY = 'data/messages.json'

function verifyAuth(req) {
  const authHeader = req.headers['authorization'] || ''
  const token = authHeader.replace('Bearer ', '').trim()
  if (!token) return { error: 'No token provided', status: 401 }
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString('utf8'))
    if (!payload.exp || Date.now() > payload.exp) return { error: 'Token expired', status: 401 }
    return { ok: true, payload }
  } catch {
    return { error: 'Invalid token', status: 401 }
  }
}

async function readData() {
  try {
    const info = await head(BLOB_KEY, { token: process.env.BLOB_READ_WRITE_TOKEN })
    const res = await fetch(info.url)
    return await res.json()
  } catch {
    return []
  }
}

async function writeData(data) {
  await put(BLOB_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false
  })
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const auth = verifyAuth(req)
  if (!auth.ok) return res.status(auth.status).json({ error: auth.error })

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'Invalid JSON' }) }
  }

  try {
    if (req.method === 'GET') {
      const messages = await readData()
      // Sort by createdAt desc (newest first)
      messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      return res.status(200).json(messages)
    }

    if (req.method === 'PUT') {
      // Mark as read/unread
      const { id, lu } = body || {}
      if (!id) return res.status(400).json({ error: 'id requis' })
      const messages = await readData()
      const idx = messages.findIndex(m => m.id === id)
      if (idx === -1) return res.status(404).json({ error: 'Message non trouvé' })
      messages[idx] = { ...messages[idx], lu: lu !== undefined ? Boolean(lu) : true }
      await writeData(messages)
      return res.status(200).json(messages[idx])
    }

    if (req.method === 'DELETE') {
      const { id } = body || req.query || {}
      if (!id) return res.status(400).json({ error: 'id requis' })
      const messages = await readData()
      const filtered = messages.filter(m => m.id !== id)
      if (filtered.length === messages.length) return res.status(404).json({ error: 'Message non trouvé' })
      await writeData(filtered)
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('messages error:', err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
