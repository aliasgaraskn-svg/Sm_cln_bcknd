import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        secure: false, // Required for non-HTTPS localhost
        sameSite: 'lax',
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5175',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
