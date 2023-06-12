import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    credentials: true
  });
  app.useStaticAssets(join(__dirname, '..', '..', 'public'))

  await app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
}
bootstrap();
