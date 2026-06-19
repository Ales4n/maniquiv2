import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getGoogleRating } from './_lib/google'
import { getCurrentMetafields, updateMetafields } from './_lib/shopify'
import { sendAlert } from './_lib/alert'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // GET: llamada de Vercel Cron (autenticada con CRON_SECRET)
  // POST: llamada manual o externa (autenticada con SHOPIFY_FLOW_SECRET)
  if (req.method === 'GET') {
    const auth = req.headers['authorization']
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  } else if (req.method === 'POST') {
    const auth = req.headers['authorization']
    if (auth !== `Bearer ${process.env.SHOPIFY_FLOW_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const [google, current] = await Promise.all([
      getGoogleRating(),
      getCurrentMetafields()
    ])

    const rating = Math.round(google.rating * 10) / 10
    const count = google.userRatingCount
    const anomalies: string[] = []

    if (rating < 4.5) {
      anomalies.push(`Rating bajo: ${rating} (umbral: 4.5)`)
    }
    if (current.review_count > 0 && count < current.review_count) {
      anomalies.push(`Reseñas bajaron de ${current.review_count} a ${count}`)
    }

    if (anomalies.length > 0) {
      await sendAlert(anomalies)
    }

    if (rating < 4.0) {
      return res.status(200).json({
        updated: false,
        reason: 'Rating below 4.0 — update blocked',
        anomalies
      })
    }

    const now = new Date()
    const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
    const lastUpdated = `${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`

    await updateMetafields({ rating, count, lastUpdated })

    return res.status(200).json({ updated: true, rating, count, lastUpdated, anomalies })

  } catch (err) {
    console.error('[sync-reviews]', err)
    return res.status(500).json({ error: 'Internal error — metafields not updated' })
  }
}
