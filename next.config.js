'use strict'

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  basePath: process.env.BASEPATH
}

module.exports = nextConfig
