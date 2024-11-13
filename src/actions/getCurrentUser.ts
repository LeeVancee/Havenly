'use server';
import prisma from '@/libs/prismadb';
import { auth } from '@/libs/auth'; // path to your Better Auth server instance
import { headers } from 'next/headers';

export default async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
    };
  } catch (error) {
    console.log(error);
  }
}
