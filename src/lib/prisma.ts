import type { PrismaClient } from '@prisma/client'
import mockPrisma from './mockDataService'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new (require('@prisma/client').PrismaClient)()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = mockPrisma
  }
  prisma = (global as any).prisma
}

export default prisma