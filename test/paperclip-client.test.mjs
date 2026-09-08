import test from 'node:test'
import assert from 'node:assert/strict'
import { PaperclipClient } from '../src/paperclip-client.mjs'

test('normalizes API base URL and adds JSON header', () => {
  const client = new PaperclipClient({ apiBase: 'http://localhost:3006/', apiKey: '' })
  assert.equal(client.apiBase, 'http://localhost:3006')
  assert.equal(client.headers()['content-type'], 'application/json')
})

test('adds authorization header only when API key exists', () => {
  const withoutKey = new PaperclipClient({ apiBase: 'http://localhost:3006', apiKey: '' })
  assert.equal(withoutKey.headers().authorization, undefined)

  const withKey = new PaperclipClient({ apiBase: 'http://localhost:3006', apiKey: 'example-token' })
  assert.equal(withKey.headers().authorization, 'Bearer example-token')
})
