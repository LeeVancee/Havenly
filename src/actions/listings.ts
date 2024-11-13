'use server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function createListings(req: any) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = req;

    Object.keys(req).forEach((value: any) => {
      if (!req[value]) {
        NextResponse.error();
      }
    });

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });
    console.log(listing);

    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}

export async function deleteListings({ params }: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });
  revalidatePath('/');
  // return listing;
}
