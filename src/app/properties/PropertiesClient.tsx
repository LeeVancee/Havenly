'use client';

import { toast } from 'react-hot-toast';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeListing, SafeUser } from '@/types';

import Heading from '@/components/Heading';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import { deleteListings } from '@/actions/listings';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: any;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    deleteListings(id)
      .then(() => {
        toast.success('Listing deleted');
        // router.refresh();
      })
      .catch((error) => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setDeletingId('');
      });
  }, []);

  return (
    <Container>
      <Heading title="房屋" subtitle="您的所有房屋" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="刪除旅居"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
