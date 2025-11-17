import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Please change this name server running on http://localhost:${PORT}`)
})