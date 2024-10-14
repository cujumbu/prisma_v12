import type { Claim, User, PrismaClient } from '@prisma/client';

class MockPrismaClient implements Partial<PrismaClient> {
  private claims: Claim[] = [];
  private users: User[] = [];

  constructor() {
    // Initialize with some mock data
    this.claims.push({
      id: '1',
      orderNumber: 'ORD001',
      email: 'user@example.com',
      name: 'John Doe',
      address: '123 Main St',
      phoneNumber: '1234567890',
      brand: 'Example Brand',
      problemDescription: 'Not working',
      status: 'Pending',
      submissionDate: new Date()
    });

    this.users.push({
      id: '1',
      email: 'admin@example.com',
      password: 'hashedpassword',
      isAdmin: true
    });
  }

  claim = {
    create: async (data: any) => {
      const newClaim = { id: Date.now().toString(), ...data.data };
      this.claims.push(newClaim as Claim);
      return newClaim;
    },
    findFirst: async (query: any) => {
      return this.claims.find(claim => 
        claim.orderNumber === query.where.orderNumber && 
        claim.email === query.where.email
      );
    },
    findMany: async () => {
      return this.claims;
    },
    update: async (query: any) => {
      const index = this.claims.findIndex(claim => claim.id === query.where.id);
      if (index !== -1) {
        this.claims[index] = { ...this.claims[index], ...query.data };
        return this.claims[index];
      }
      throw new Error('Claim not found');
    },
  };

  user = {
    findUnique: async (query: any) => {
      return this.users.find(user => user.email === query.where.email);
    },
  };
}

const mockPrisma = new MockPrismaClient();

export default mockPrisma;