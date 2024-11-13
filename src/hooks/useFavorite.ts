import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '@/types';
import useLoginModal from './useLoginModal';
import { addFavorite, removeFavorite } from '@/actions/favorites';

interface IUseFavorite {
  listingId: string;
  currentUser?: any;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await removeFavorite(listingId);
          toast.success('removed!');
        } else {
          await addFavorite(listingId);
          toast.success('addFavorite!');
        }
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, listingId, loginModal]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
