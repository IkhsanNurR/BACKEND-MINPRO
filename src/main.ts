import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import * as express from "express";

async function bootstrap() {
  const corsOptions: CorsOptions = {
    origin: [
      "http://192.168.68.112:3000",
      "http://192.168.68.104:3000",
      "http://localhost:3000",
    ], // Replace with your frontend server URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Add the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Add the allowed request headers
    credentials: true, // Set to true if you need to pass cookies or authentication headers
  };
  const port = process.env.PORT;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ credentials: true });
  // app.use(express.urlencoded({ extended: true }));
  // app.enableCors(corsOptions);
  app.useStaticAssets(join(__dirname, "..", "..", "public"));
  app.use("/public", express.static("public"));

  await app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
}
bootstrap();
