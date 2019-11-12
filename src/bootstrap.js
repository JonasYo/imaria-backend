const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
});
