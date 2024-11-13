import EmptyState from '@/components/EmptyState';

import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';

import TripsClient from './TripsClient';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="權限不足" subtitle="請登入" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState title="找不到旅行記錄" subtitle="看起來你還沒有預訂過任何旅行。" />;
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
