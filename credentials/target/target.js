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

const projectKey = 'clonedue'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.sphere.io',
  projectKey,
  credentials: {
    clientId: 'MMY1110gt5hLGO5ic-URkBjm',
    clientSecret: 'WcOIAHjk_giZWMDPuxru8GTzkjob4wbF',
  },
  scopes: ['manage_project:clonedue view_api_clients:clonedue manage_api_clients:clonedue'],
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
