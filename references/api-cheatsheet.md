# Paperclip API cheatsheet

These endpoints are intentionally generic. Replace IDs with values from your own Paperclip instance.

```bash
curl -s "$PAPERCLIP_API_BASE/api/health"

curl -s \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  "$PAPERCLIP_API_BASE/api/companies/$PAPERCLIP_COMPANY_ID/agents"

curl -s \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  "$PAPERCLIP_API_BASE/api/companies/$PAPERCLIP_COMPANY_ID/projects"

curl -s -X POST \
  -H "Authorization: Bearer $PAPERCLIP_API_KEY" \
  -H "Content-Type: application/json" \
  "$PAPERCLIP_API_BASE/api/companies/$PAPERCLIP_COMPANY_ID/issues" \
  -d '{"title":"Example","description":"Do the thing","projectId":"PROJECT_ID","assigneeAgentId":"AGENT_ID","status":"todo","priority":"medium"}'
```
