export class PaperclipClient {
  constructor({ apiBase, apiKey } = {}) {
    this.apiBase = (apiBase || process.env.PAPERCLIP_API_BASE || 'http://127.0.0.1:3006').replace(/\/$/, '')
    this.apiKey = apiKey === undefined ? process.env.PAPERCLIP_API_KEY || '' : apiKey
  }

  headers(extra = {}) {
    return {
      'content-type': 'application/json',
      ...(this.apiKey ? { authorization: `Bearer ${this.apiKey}` } : {}),
      ...extra
    }
  }

  async request(path, options = {}) {
    const res = await fetch(`${this.apiBase}${path}`, {
      ...options,
      headers: this.headers(options.headers || {})
    })
    const text = await res.text()
    let body
    try {
      body = text ? JSON.parse(text) : null
    } catch {
      body = text
    }
    if (!res.ok) {
      const message = typeof body === 'string' ? body : JSON.stringify(body)
      throw new Error(`Paperclip ${res.status} ${res.statusText}: ${message}`)
    }
    return body
  }

  health() {
    return this.request('/api/health', { headers: { accept: 'application/json' } })
  }

  listAgents(companyId = process.env.PAPERCLIP_COMPANY_ID) {
    if (!companyId) throw new Error('Missing PAPERCLIP_COMPANY_ID')
    return this.request(`/api/companies/${companyId}/agents`)
  }

  listProjects(companyId = process.env.PAPERCLIP_COMPANY_ID) {
    if (!companyId) throw new Error('Missing PAPERCLIP_COMPANY_ID')
    return this.request(`/api/companies/${companyId}/projects`)
  }

  listIssues(companyId = process.env.PAPERCLIP_COMPANY_ID, query = 'status=backlog,todo,in_progress,in_review,blocked&limit=100') {
    if (!companyId) throw new Error('Missing PAPERCLIP_COMPANY_ID')
    return this.request(`/api/companies/${companyId}/issues?${query}`)
  }

  createIssue({
    companyId = process.env.PAPERCLIP_COMPANY_ID,
    projectId = process.env.PAPERCLIP_PROJECT_ID,
    assigneeAgentId = process.env.PAPERCLIP_ASSIGNEE_AGENT_ID,
    title,
    description,
    priority = 'medium',
    status = 'todo'
  }) {
    if (!companyId) throw new Error('Missing companyId/PAPERCLIP_COMPANY_ID')
    if (!projectId) throw new Error('Missing projectId/PAPERCLIP_PROJECT_ID')
    if (!title) throw new Error('Missing title')
    return this.request(`/api/companies/${companyId}/issues`, {
      method: 'POST',
      body: JSON.stringify({ title, description, projectId, assigneeAgentId, priority, status })
    })
  }

  addIssueComment(identifier, body) {
    if (!identifier) throw new Error('Missing issue identifier')
    if (!body) throw new Error('Missing comment body')
    return this.request(`/api/issues/${identifier}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body })
    })
  }
}
