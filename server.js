import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

let prisma;
if (process.env.NODE_ENV === 'production') {
  const { PrismaClient } = await import('@prisma/client');
  prisma = new PrismaClient();
} else {
  prisma = (await import('./src/lib/mockDataService.js')).default;
}

// ... rest of the server code remains the same