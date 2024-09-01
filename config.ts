import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/music',
};

export default config;