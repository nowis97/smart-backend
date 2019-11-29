import {Smart} from './application';
import {ApplicationConfig} from '@loopback/core';
import {MultipartFormDataBodyParser} from './utils/MultipartFormDataBodyParser';

export {Smart};

export async function main(options: ApplicationConfig = {}) {
  const app = new Smart(options);
  await app.boot();
  await app.start();
  app.bodyParser(MultipartFormDataBodyParser);
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
