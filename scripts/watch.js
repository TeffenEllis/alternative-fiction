/* eslint-env node */

import {routes} from "../package.json"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import config from "../webpack.config"

const {hostname, port} = routes.development.views

const server = new WebpackDevServer(webpack(config), {
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  stats: {
    assets: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    timings: true,
    version: false
  }
})

server.listen(port, hostname)
