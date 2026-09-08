import { loadEnv } from './load-env.mjs'
import { PaperclipClient } from '../src/paperclip-client.mjs'
loadEnv()
const projects = await new PaperclipClient().listProjects()
for (const project of Array.isArray(projects) ? projects : projects.projects || projects.data || []) {
  console.log(`${project.name || project.title || project.id}\t${project.id}`)
}
