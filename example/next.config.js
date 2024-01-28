require('dotenv').config();

module.exports = {
  // your other configurations
  images: {
    domains: ['ui-avatars.com'],
  },
  env: {
    RPC_API_KEY: process.env.RPC_API_KEY,
  },
};