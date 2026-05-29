import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
const API_KEY    = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

const ALLOWED_ORIGINS = [
  'https://maniquicreaciones.com',
  'https://w30zg1-rt.myshopify.com',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin ?? ''
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { file } = req.body as { file?: string }

  if (!file || !file.startsWith('data:image/')) {
    return res.status(400).json({ error: 'Se requiere una imagen válida (data URL)' })
  }

  // ~2.5 MB imagen → ~3.4 MB base64
  if (file.length > 3_500_000) {
    return res.status(400).json({ error: 'Imagen demasiado grande. Máximo ~2.5 MB.' })
  }

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error('[upload-photo] Missing Cloudinary env vars')
    return res.status(500).json({ error: 'Servicio de subida no configurado' })
  }

  try {
    const timestamp = Math.round(Date.now() / 1000)
    const folder    = 'maniqui/prendas'
    const signature = crypto
      .createHash('sha1')
      .update(`folder=${folder}&timestamp=${timestamp}${API_SECRET}`)
      .digest('hex')

    const form = new FormData()
    form.append('file',      file)
    form.append('api_key',   API_KEY)
    form.append('timestamp', String(timestamp))
    form.append('folder',    folder)
    form.append('signature', signature)

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: form }
    )

    if (!cloudRes.ok) {
      const errText = await cloudRes.text()
      console.error('[upload-photo] Cloudinary error:', errText)
      throw new Error('Cloudinary rechazó la imagen')
    }

    const data = await cloudRes.json() as { secure_url: string }
    return res.status(200).json({ url: data.secure_url })
  } catch (err) {
    console.error('[upload-photo]', err)
    return res.status(500).json({ error: 'Error al subir la imagen. Inténtalo de nuevo.' })
  }
}
