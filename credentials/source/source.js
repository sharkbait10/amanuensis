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

const projectKey = 'ie-visionexpress-testing'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.sphere.io',
  projectKey,
  credentials: {
    clientId: 'pa1pHO8CF15EcoP9KKevzju9',
    clientSecret: 'kua5u3dcS4YI2huKEqxyf_ITagIa9w9M',
  },
  scopes: ['manage_project:ie-visionexpress-testing view_api_clients:ie-visionexpress-testing manage_api_clients:ie-visionexpress-testing'],
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
