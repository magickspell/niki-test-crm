// this is root (entry file) of the BE App - nest.js
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

require('dotenv').config() // for .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
