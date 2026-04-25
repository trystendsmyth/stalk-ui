import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'public/r')
const port = Number(process.env.STALK_REGISTRY_PORT ?? '4874')

const contentTypes: Record<string, string> = {
  '.json': 'application/json; charset=utf-8',
}

const toFilePath = (url: string | undefined) => {
  const pathname = decodeURIComponent(
    new URL(url ?? '/', `http://localhost:${String(port)}`).pathname,
  )
  const normalized = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '')
  return join(root, normalized === '/' ? 'integrity.json' : normalized)
}

const server = createServer((request, response) => {
  void (async () => {
    const filePath = toFilePath(request.url)

    try {
      const fileStat = await stat(filePath)

      if (!fileStat.isFile()) {
        response.writeHead(404)
        response.end('Not found')
        return
      }

      response.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
      })
      createReadStream(filePath).pipe(response)
    } catch {
      response.writeHead(404)
      response.end('Not found')
    }
  })()
})

server.listen(port, () => {
  console.log(`Serving registry from ${root} at http://localhost:${String(port)}`)
})
