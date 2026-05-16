export async function getGoogleRating(): Promise<{ rating: number; userRatingCount: number }> {
  const placeId = process.env.GOOGLE_PLACE_ID
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!placeId || !apiKey) throw new Error('Missing Google env vars')

  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount'
    }
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Google Places API ${res.status}: ${body}`)
  }

  const data = await res.json() as { rating?: number; userRatingCount?: number }

  if (data.rating == null || data.userRatingCount == null) {
    throw new Error('Google Places API: missing rating or userRatingCount in response')
  }

  return { rating: data.rating, userRatingCount: data.userRatingCount }
}
