export async function sendAlert(anomalies: string[]): Promise<void> {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[alert] ALERT_WEBHOOK_URL no configurado. Anomalía:', anomalies.join(' | '))
    return
  }
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'google_reviews_anomaly',
        timestamp: new Date().toISOString(),
        anomalies
      })
    })
  } catch (err) {
    console.error('[alert] Webhook falló:', err)
  }
}
