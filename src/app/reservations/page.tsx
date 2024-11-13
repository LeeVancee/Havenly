import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import EmptyState from '@/components/EmptyState';
import ReservationsClient from './ReservationsClient';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="權限不足" subtitle="請登入" />;
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });
  if (reservations.length === 0) {
    return <EmptyState title="找不到預訂記錄" subtitle="看起來你還沒有預訂過任何行程" />;
  }
  return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default ReservationPage;
