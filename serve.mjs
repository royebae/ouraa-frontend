import http from "http"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const PORT = parseInt(process.argv[2] || "8080", 10)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "out")

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".ico": "image/x-icon",
}

http
  .createServer((req, res) => {
    let filePath = path.join(ROOT, req.url === "/" ? "index.html" : req.url)

    if (!fs.existsSync(filePath)) {
      filePath = path.join(ROOT, "404.html")
    }

    const ext = path.extname(filePath)
    const contentType = MIME[ext] || "application/octet-stream"

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500)
        return res.end("Internal Server Error")
      }
      res.writeHead(200, { "Content-Type": contentType })
      res.end(data)
    })
  })
  .listen(PORT, "0.0.0.0", () => {
    console.log(`OURAA frontend running on http://0.0.0.0:${PORT}`)
  })
