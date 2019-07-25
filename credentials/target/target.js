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

const projectKey = 'troia'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.sphere.io',
  projectKey,
  credentials: {
    clientId: 'b8_cAW_-BXoJqAS3beIdagwB',
    clientSecret: '5bKrQxFi5UXKjNbnvVbscDcaIQbUeV7m',
  },
  scopes: ['manage_project:troia view_api_clients:troia manage_api_clients:troia'],
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
