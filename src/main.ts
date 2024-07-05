import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  const port = process.env.DEV_PORT || 8080;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
