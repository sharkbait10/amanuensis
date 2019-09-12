const { createClient } = require('@commercetools/sdk-client')
  const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
  const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
  const fetch = require('node-fetch')

  const projectKey = 'fava'

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.sphere.io',
    projectKey,
    credentials: {
      clientId: '6OO8jx1kNRjDyfaUM5LxZ9io',
      clientSecret: 'ptvT8lnYqqYZAaM75Lg_sMIKIY-_ww_B',
    },
    scopes: ['manage_project:fava view_api_clients:fava manage_api_clients:fava'],
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
