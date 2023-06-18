import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const port = process.env.PORT || 5000;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
bootstrap();
