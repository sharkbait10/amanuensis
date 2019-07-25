const {
    createClient
} = require('@commercetools/sdk-client')
const {
    createRequestBuilder
} = require('@commercetools/api-request-builder')
const {
    createQueueMiddleware
} = require('@commercetools/sdk-middleware-queue')
var libs = require('require-all')(__dirname + '/../../credentials/target');

const authMiddleware = libs.target.authMiddleware;

const httpMiddleware = libs.target.httpMiddleware;

const queueMiddleware = createQueueMiddleware({
    concurrency: 5,
})

const client = createClient({
    middlewares: [authMiddleware, httpMiddleware, queueMiddleware],
})

exports.createRequestBuilderTarget = createRequestBuilder
exports.clientTarget = client
