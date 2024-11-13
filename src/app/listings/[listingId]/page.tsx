import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservations';
import React, { lazy, useMemo } from 'react';

interface Iparams {
  listingId: string;
}
const ListenPage = async (props: { params: Promise<Iparams> }) => {
  const params = await props.params;
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState showReset />;
  }
  return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />;
};

export default ListenPage;
