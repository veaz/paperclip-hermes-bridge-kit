import { loadEnv } from './load-env.mjs'
import { PaperclipClient } from '../src/paperclip-client.mjs'
loadEnv()
const [title, ...descriptionParts] = process.argv.slice(2)
if (!title) {
  console.error('Usage: npm run create-issue -- "Title" "Description"')
  process.exit(2)
}
const issue = await new PaperclipClient().createIssue({ title, description: descriptionParts.join(' ') })
console.log(JSON.stringify(issue, null, 2))
