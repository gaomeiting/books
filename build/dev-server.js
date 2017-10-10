require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
var apiRoutes= express.Router()
//http://html.read.duokan.com/mfsv2/secure/fdsc3/60009/file
apiRoutes.get('/multi_link', (req,res) => {
  axios.get('http://dushu.xiaomi.com/drm/v0/fiction/multi_link',{
    headers: {
      referer: 'http://dushu.xiaomi.com/',
      host: 'dushu.xiaomi.com',
      cookie:'app_id=mi_wap; build=8888; device_id=D950UOLK44ZTJ58R; user_type=2; device_hash=48897f6e75b43a724ab6726b86c2fad2; Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1505362358; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1505362358'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})
apiRoutes.get('/catalog', (req,res) => {
  console.log(req.query)
  axios.get(`http://dushu.xiaomi.com/store/v0/fiction/detail/${req.query.fiction_id}`,{
    headers: {
      referer: 'http://dushu.xiaomi.com/',
      host: 'dushu.xiaomi.com',
      cookie:'Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1505707016,1505784061; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1505784104; app_id=mi_wap; build=8888; device_id=D950G879582KE5EJ; user_type=2; device_hash=f5a80953dd67a2389b061ca1c31add10'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})
apiRoutes.get('/search', (req,res) => {
  axios.get(`http://dushu.xiaomi.com/store/v0/ad?key=df_search_tags&a=1`,{
    headers: {
      referer: 'http://dushu.xiaomi.com/',
      host: 'dushu.xiaomi.com',
      cookie:'Hm_lvt_a1d10542fc664b658c3ce982b1cf4937=1507519313,1507598919; Hm_lpvt_a1d10542fc664b658c3ce982b1cf4937=1507600477; app_id=mi_wap; build=8888; device_id=D950CIHJW00JX8FG; user_type=2; device_hash=73d11797853647042ab5a490a4ee3a4c'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((err) => {
    console.log(err)
  })
})
app.use('/api', apiRoutes)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
