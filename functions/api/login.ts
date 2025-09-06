import { Hono } from 'hono'

const app = new Hono()

const sessions = new Map<string, number>()
const nanoid = () => Math.random().toString(36).substr(2, 9)
const ADMIN_PASSWORD = '1234'

app.post('/', async (c) => {
  const { username, password } = await c.req.json()
  if (username === 'admin' && password === ADMIN_PASSWORD) {
    const token = nanoid()
    sessions.set(token, Date.now() + 3600000)
    return c.json({ token })
  }
  return c.json({ error: 'invalid credentials' }, 401)
})

export const onRequest = app.fetch
