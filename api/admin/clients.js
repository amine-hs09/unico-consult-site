import { put, head, del } from '@vercel/blob'

const BLOB_KEY = 'data/clients.json'

// Auth middleware
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

// Storage helpers
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
  const json = JSON.stringify(data, null, 2)
  await put(BLOB_KEY, json, {
    access: 'public',
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false
  })
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
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
      const clients = await readData()
      return res.status(200).json(clients)
    }

    if (req.method === 'POST') {
      const { nom, secteur, employes, statut, logo, url } = body || {}
      if (!nom) return res.status(400).json({ error: 'nom requis' })
      const clients = await readData()
      const item = {
        id: String(Date.now()),
        nom, secteur: secteur || '', employes: employes || '',
        statut: statut || 'actif', logo: logo || '', url: url || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      clients.push(item)
      await writeData(clients)
      return res.status(201).json(item)
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = body || {}
      if (!id) return res.status(400).json({ error: 'id requis' })
      const clients = await readData()
      const idx = clients.findIndex(c => c.id === id)
      if (idx === -1) return res.status(404).json({ error: 'Client non trouvé' })
      clients[idx] = { ...clients[idx], ...updates, id, updatedAt: new Date().toISOString() }
      await writeData(clients)
      return res.status(200).json(clients[idx])
    }

    if (req.method === 'DELETE') {
      const { id } = body || req.query || {}
      if (!id) return res.status(400).json({ error: 'id requis' })
      const clients = await readData()
      const filtered = clients.filter(c => c.id !== id)
      if (filtered.length === clients.length) return res.status(404).json({ error: 'Client non trouvé' })
      await writeData(filtered)
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('clients error:', err)
    return res.status(500).json({ error: 'Erreur serveur' })
  }
}
