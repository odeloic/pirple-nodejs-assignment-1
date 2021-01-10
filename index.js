
// load dependencies
var http = require('http')
var url = require('url')
var config = require('./config')

// server function
var server = http.createServer(function(req, res) {
  // get the trimmed path name
  var path = url.parse(req.url, true).pathname.replace(/^\/+|\/+$/g, '')
  // decide handler for this request
  var chosenHanlder = typeof(router[path]) !== 'undefined' ? router[path] : handlers.notFound
  chosenHanlder(function(statusCode, payload) {
    statusCode = typeof(statusCode) == 'number' ? statusCode : 200
    payload = typeof(payload) == 'object' ? payload : {}
    res.setHeader('content-type', 'application/json')
    res.writeHead(statusCode)
    res.end(JSON.stringify(payload))
    console.log('Request received on path ' +path+ ' with this response: ', statusCode,JSON.stringify(payload))
  })

})

server.listen(config.port, function() {
  console.log('Server listening on port '+config.port)
})

// define handler object
var handlers = {
  hello: function(callback) {
    callback(200, { 'message': 'Welcome to this API.', data})
  },
  notFound: function(callback) {
    callback(404, { 'message': 'Path not found!'})
  }
}
// define route handler
var router = {
  'hello': handlers.hello
}