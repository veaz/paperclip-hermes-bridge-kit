import { loadEnv } from './load-env.mjs'
import { PaperclipClient } from '../src/paperclip-client.mjs'
loadEnv()
const result = await new PaperclipClient().health()
console.log(JSON.stringify(result, null, 2))
