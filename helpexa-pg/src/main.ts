import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import mysql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // 1. Automatically create database if it doesn't exist
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE || 'helpexa_db'}\``);
  await connection.end();

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
    origin: 'http://localhost:5174',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  const serverUrl = await app.getUrl();
  console.log(`Application is running on: ${serverUrl}`);

  // 2. Automatic Seeding if Database is empty
  try {
    const seedConn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE || 'helpexa_db',
      multipleStatements: true
    });

    const [userRows]: any = await seedConn.query('SELECT COUNT(*) as count FROM users');
    if (userRows[0].count === 0) {
      console.log('Database is empty. Seeding initial data from seed_data.sql...');
      const seedSql = fs.readFileSync(path.join(process.cwd(), 'seed_data.sql'), 'utf8');
      const queries = seedSql.split(';').filter(q => q.trim().length > 0);
      
      for (const query of queries) {
        await seedConn.query(query);
      }
      console.log('Seeding completed successfully!');
    }
    await seedConn.end();
  } catch (err) {
    console.error('Auto-seeding failed:', err.message);
  }
}
bootstrap();
