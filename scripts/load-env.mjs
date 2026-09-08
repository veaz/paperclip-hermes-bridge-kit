import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function loadEnv(path = '.env') {
  const file = resolve(process.cwd(), path)
  if (!existsSync(file)) return false
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue
    const [key, ...rest] = trimmed.split('=')
    if (!process.env[key]) process.env[key] = rest.join('=').replace(/^['"]|['"]$/g, '')
  }
  return true
}
