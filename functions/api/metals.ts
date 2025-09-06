import { Hono } from 'hono'

const app = new Hono()

const metals = [
  { key: 'gold_24k', name: 'Gold 24k', purity: 1, price_per_gram: 3300 },
  { key: 'gold_18k', name: 'Gold 18k', purity: 0.75, price_per_gram: 2700 },
  { key: 'silver_925', name: 'Silver 92.5%', purity: 0.925, price_per_gram: 35 },
  { key: 'pt950', name: 'Platinum Pt950', purity: 0.95, price_per_gram: 4300 },
]

app.get('/', (c) => {
  return c.json(metals)
})

export const onRequest = app.fetch
