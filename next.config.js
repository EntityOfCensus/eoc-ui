'use strict'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'out',
  basePath: process.env.BASEPATH
}

module.exports = nextConfig
