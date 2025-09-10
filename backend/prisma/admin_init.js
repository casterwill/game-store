import { PrismaClient } from '../generated/prisma/index.js'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminEmail = 'admin@example.com';


  // Cek apakah admin sudah ada
  const adminExists = await prisma.user.findFirst({
    where: { email: adminEmail },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user created: admin@example.com / admin123');
  } else {
    console.log('⚠️ Admin user already exists.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });