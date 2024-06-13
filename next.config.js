'use strict'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'dist',
  basePath: process.env.BASEPATH
}

module.exports = nextConfig
