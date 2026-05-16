const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const API_VERSION = '2025-01'

async function getAccessToken(): Promise<string> {
  const res = await fetch(`https://${DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Shopify OAuth ${res.status}: ${body}`)
  }
  const { access_token } = await res.json() as { access_token: string }
  if (!access_token) throw new Error('Shopify OAuth: access_token missing in response')
  return access_token
}

async function gql(token: string, query: string, variables?: object) {
  const res = await fetch(`https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token
    },
    body: JSON.stringify({ query, variables })
  })
  if (!res.ok) throw new Error(`Shopify API ${res.status}`)
  const json = await res.json() as { data: Record<string, unknown>; errors?: unknown }
  if (json.errors) throw new Error(`Shopify GraphQL: ${JSON.stringify(json.errors)}`)
  return json.data
}

export async function getCurrentMetafields(): Promise<{ rating: number; review_count: number }> {
  const token = await getAccessToken()
  const data = await gql(token, `{
    shop {
      r: metafield(namespace: "custom", key: "google_rating") { value }
      c: metafield(namespace: "custom", key: "google_review_count") { value }
    }
  }`)
  const shop = data.shop as { r?: { value: string }; c?: { value: string } }
  return {
    rating: parseFloat(shop.r?.value ?? '0'),
    review_count: parseInt(shop.c?.value ?? '0', 10)
  }
}

export async function updateMetafields(values: {
  rating: number
  count: number
  lastUpdated: string
}): Promise<void> {
  const token = await getAccessToken()
  const shopData = await gql(token, `{ shop { id } }`) as { shop: { id: string } }
  const shopId = shopData.shop.id

  const metafields = [
    { ownerId: shopId, namespace: 'custom', key: 'google_rating',       value: values.rating.toString(),  type: 'number_decimal' },
    { ownerId: shopId, namespace: 'custom', key: 'google_review_count', value: values.count.toString(),   type: 'number_integer' },
    { ownerId: shopId, namespace: 'custom', key: 'google_last_updated', value: values.lastUpdated,        type: 'single_line_text_field' }
  ]

  const data = await gql(token, `
    mutation Set($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { key value }
        userErrors { field message }
      }
    }
  `, { metafields })

  const result = data.metafieldsSet as { userErrors: { field: string; message: string }[] }
  if (result.userErrors?.length) {
    throw new Error(`Metafield errors: ${JSON.stringify(result.userErrors)}`)
  }
}
