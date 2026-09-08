#!/usr/bin/env node
import { PaperclipClient } from './paperclip-client.mjs'

const client = new PaperclipClient()
const [cmd, ...args] = process.argv.slice(2)

async function main() {
  if (!cmd || ['help', '--help', '-h'].includes(cmd)) {
    console.log(`pc-bridge commands:\n  health\n  agents\n  projects\n  issues\n  create-issue "Title" "Description"`)
    return
  }
  if (cmd === 'health') return console.log(JSON.stringify(await client.health(), null, 2))
  if (cmd === 'agents') return console.log(JSON.stringify(await client.listAgents(), null, 2))
  if (cmd === 'projects') return console.log(JSON.stringify(await client.listProjects(), null, 2))
  if (cmd === 'issues') return console.log(JSON.stringify(await client.listIssues(), null, 2))
  if (cmd === 'create-issue') {
    const [title, description = ''] = args
    return console.log(JSON.stringify(await client.createIssue({ title, description }), null, 2))
  }
  throw new Error(`Unknown command: ${cmd}`)
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})
