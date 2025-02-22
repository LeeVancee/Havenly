'use client';

import { toast } from 'react-hot-toast';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/types';
import Heading from '@/components/Heading';
import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import { deleteReservation } from '@/actions/reservation';

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: any;
}

const ReservationClient = ({ reservations, currentUser }: ReservationsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      deleteReservation(id)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="預訂記錄" subtitle="客戶預訂" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="取消該的預訂"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
