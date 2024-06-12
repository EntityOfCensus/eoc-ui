'use strict'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.BASEPATH,
  cacheMaxMemorySize: 0 // disable default in-memory caching
}

module.exports = nextConfig
