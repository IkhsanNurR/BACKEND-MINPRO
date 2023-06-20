import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import express, { urlencoded } from "express";
import { ValidationPipe } from "@nestjs/common";

const corsOptions: CorsOptions = {
  origin: ["http://192.168.68.136:3000", "http://localhost:3000"], // Replace with your frontend server URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Add the allowed HTTP methods
  // allowedHeaders: ["Content-Type", "Authorization"], // Add the allowed request headers
  // credentials: true, // Set to true if you need to pass cookies or authentication headers
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  // app.use('/image', express.static('image/product'));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsOptions);
  await app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
}
bootstrap();
