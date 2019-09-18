const { createClient } = require('@commercetools/sdk-client')
  const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
  const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
  const fetch = require('node-fetch')

  const projectKey = 'ie-visionexpress-acceptance'

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: 'https://auth.sphere.io',
    projectKey,
    credentials: {
      clientId: '5euTl6v3wOuzKPylMeIqySGE',
      clientSecret: 'Oimu4EvxATUaWNpAB9puaRD_q06uO-VV',
    },
    scopes: ['manage_project:ie-visionexpress-acceptance manage_api_clients:ie-visionexpress-acceptance view_api_clients:ie-visionexpress-acceptance'],
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
