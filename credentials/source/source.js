const { createClient } = require('@commercetools/sdk-client')
  const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
  const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
  const fetch = require('node-fetch')

  const projectKey = 'source-project-key'

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.sphere.io',
    projectKey,
    credentials: {
      clientId: 'asd',
      clientSecret: 'asdasd',
    },
    scopes: ['manage_project:source-project manage_api_clients:source-project view_api_clients:source-project'],
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
