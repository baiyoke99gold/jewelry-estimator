import { Hono } from 'hono'

const app = new Hono()

const metals = [
  { key: 'gold_24k', name: 'Gold 24k', purity: 1, price_per_gram: 3300 },
  { key: 'gold_18k', name: 'Gold 18k', purity: 0.75, price_per_gram: 2700 },
  { key: 'silver_925', name: 'Silver 92.5%', purity: 0.925, price_per_gram: 35 },
  { key: 'pt950', name: 'Platinum Pt950', purity: 0.95, price_per_gram: 4300 },
]

const presetWeights = { ring_thin: 2, ring_men: 8, bracelet_5mm: 15, pendant_medium: 5 }
const gemstonePrices = { none: 0, diamond: 40000, ruby: 8000, sapphire: 7000 }

app.post('/', async (c) => {
  const { metal, preset, gemstone, complexity } = await c.req.json()
  let price =
    (metals.find((m) => m.key === metal)?.price_per_gram || 0) *
    (presetWeights[preset] || 0)
  price += gemstonePrices[gemstone] || 0
  price *= complexity || 1
  return c.json({ price })
})

export const onRequest = app.fetch
