const PORT = process.env.PORT || 8000
require('dotenv').config();

const path = require('path')
const morgan = require('morgan')
const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const compiler = webpack(webpackConfig)

app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.handle = (err, data) => res.status(err ? 400 : 200).send(err || data);
  next();
});

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))

app.use(require("webpack-hot-middleware")(compiler));

// if(!app.working) {
//   make.app(work)
// }

app.use('/api',require('./routes/api'))

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./src/index.html"));
});

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
})
