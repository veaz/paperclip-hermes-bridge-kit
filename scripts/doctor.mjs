import { existsSync } from 'node:fs'
import { loadEnv } from './load-env.mjs'
import { PaperclipClient } from '../src/paperclip-client.mjs'

const hasEnv = loadEnv()
console.log(`.env present: ${hasEnv}`)
console.log(`PAPERCLIP_API_BASE: ${process.env.PAPERCLIP_API_BASE || 'http://127.0.0.1:3006 (default)'}`)
console.log(`PAPERCLIP_COMPANY_ID set: ${Boolean(process.env.PAPERCLIP_COMPANY_ID)}`)
console.log(`PAPERCLIP_API_KEY set: ${Boolean(process.env.PAPERCLIP_API_KEY)}`)
console.log(`.env.example present: ${existsSync('.env.example')}`)
try {
  const health = await new PaperclipClient().health()
  console.log(`Paperclip health: OK ${JSON.stringify(health)}`)
} catch (err) {
  console.log(`Paperclip health: FAIL ${err.message}`)
  process.exitCode = 1
}
