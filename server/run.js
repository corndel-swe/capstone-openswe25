import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`FrameRate server running on http://localhost:${PORT}`)
})