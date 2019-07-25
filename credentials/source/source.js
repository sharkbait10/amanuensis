const {
  createClient
} = require('@commercetools/sdk-client')
const {
  createAuthMiddlewareForClientCredentialsFlow
} = require('@commercetools/sdk-middleware-auth')
const {
  createHttpMiddleware
} = require('@commercetools/sdk-middleware-http')
const fetch = require('node-fetch')

const projectKey = 'porca'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.sphere.io',
  projectKey,
  credentials: {
    clientId: 'SHHqQgdSavBF43W5iuPjSN7I',
    clientSecret: 'c8BnTBmlhsH5m6kaTC_0Wl-K0b6CkAYa',
  },
  scopes: ['manage_project:porca view_api_clients:porca manage_api_clients:porca'],
  fetch,
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.sphere.io',
  fetch,
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

exports.projectKey = projectKey;
exports.authMiddleware = authMiddleware;
exports.httpMiddleware = httpMiddleware;
