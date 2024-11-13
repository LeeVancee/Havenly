import EmptyState from '@/components/EmptyState';

import getCurrentUser from '@/actions/getCurrentUser';
import getFavoriteListings from '@/actions/getFavoriteListings';

import FavoritesClient from './FavoritesClient';

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState title="找不到收藏" subtitle="看起來你還沒有收藏任何房源。" />;
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default ListingPage;
