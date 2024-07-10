import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  const port = process.env.DEV_PORT || 8080;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.enableCors({
  //   origin: [
  //     "http://localhost:3000",
  //     "http://localhost:5173",
  //     "http://localhost:5172",
  //   ],
  // });
  await app.listen(port);
}
bootstrap();
