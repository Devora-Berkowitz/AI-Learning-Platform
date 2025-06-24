import prisma from '../src/prismaClient.js';

const main = async () => {
  // הכנסת קטגוריות
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'Science' },
      { id: 2, name: 'Technology' },
      { id: 3, name: 'Mathematics' },
      { id: 4, name: 'History' },
      { id: 5, name: 'Literature' },
    ],
  });

  // הכנסת תתי קטגוריות
  await prisma.subCategory.createMany({
    data: [
      { id: 1, name: 'Physics', categoryId: 1 },
      { id: 2, name: 'Chemistry', categoryId: 1 },
      { id: 3, name: 'Biology', categoryId: 1 },
      { id: 4, name: 'Space', categoryId: 1 },
      { id: 5, name: 'Programming', categoryId: 2 },
      { id: 6, name: 'Artificial Intelligence', categoryId: 2 },
      { id: 7, name: 'Web Development', categoryId: 2 },
      { id: 8, name: 'Algebra', categoryId: 3 },
      { id: 9, name: 'Calculus', categoryId: 3 },
      { id: 10, name: 'Geometry', categoryId: 3 },
      { id: 11, name: 'Ancient History', categoryId: 4 },
      { id: 12, name: 'Modern History', categoryId: 4 },
      { id: 13, name: 'Poetry', categoryId: 5 },
      { id: 14, name: 'Fiction', categoryId: 5 },
    ],
  });

  // הכנסת מנהל
  await prisma.user.create({
    data: {
      id: '123456789',
      name: 'Admin User',
      phone: '0501234567',
      role: 'admin',
    },
  });
};

// קריאה לפונקציה הראשית
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
