import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS-u aktiv edirik
  app.enableCors({
    origin: '*', // bütün frontend-lərə icazə verir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(8000);
}
bootstrap();
