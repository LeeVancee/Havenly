import EmptyState from '@/components/EmptyState';

import getCurrentUser from '@/actions/getCurrentUser';
import getListings from '@/actions/getListings';

import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="權限不足" subtitle="請登入" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return <EmptyState title="找不到房屋" subtitle="看起來你還發佈任何房屋。" />;
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
