const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixExistingPasswords() {
  const users = [
    { email: 'mantissa6789@gmail.com', password: 'HKL@test' },
    { email: 'yuvanesh.skv@gmail.com', password: 'HKL@yuvi' },
    { email: 'pradheep.raop@gmail.com', password: 'Mantis@2510' }
  ];

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    await prisma.user.update({
      where: { email: userData.email },
      data: { password: hashedPassword }
    });
    
    console.log(`✅ Updated password for ${userData.email}`);
  }
}

fixExistingPasswords();