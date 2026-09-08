import { loadEnv } from './load-env.mjs'
import { PaperclipClient } from '../src/paperclip-client.mjs'
loadEnv()
const agents = await new PaperclipClient().listAgents()
for (const agent of Array.isArray(agents) ? agents : agents.agents || agents.data || []) {
  console.log(`${agent.name || agent.title || agent.id}\t${agent.id}\t${agent.status || ''}`)
}
