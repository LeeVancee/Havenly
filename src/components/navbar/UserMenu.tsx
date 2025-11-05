'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { SafeUser } from '@/types';
import useRentModal from '@/hooks/useRentModal';
import { useRouter } from 'next/navigation';
import { authClient } from '@/libs/auth-client';

interface UserMenuProps {
  currentUser?: any;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // 添加点击事件监听器
    document.addEventListener('mousedown', handleClickOutside);

    // 在组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center flex-row gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-200
            transition
            cursor-pointer
            "
        >
          發佈旅居
        </div>
        <div
          onClick={toggleOpen}
          className="
            flex 
            flex-row
            md:py-1
            md:px-2
            border
            border-neutral-200
            gap-3
            px-4
            rounded-full
            hover:shadow-md
            cursor-pointer
            transition
            items-center
            "
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar></Avatar>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw]  md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => router.push('/trips')} label="我的行程" />
                <MenuItem onClick={() => router.push('/favorites')} label="我的收藏" />
                <MenuItem onClick={() => router.push('/reservations')} label="預訂記錄" />
                <MenuItem onClick={() => router.push('/properties')} label="我的房屋" />
                <MenuItem onClick={rentModal.onOpen} label="發佈旅居" />
                <MenuItem onClick={() => router.push('/')} label="返回首頁" />
                <hr />
                <MenuItem onClick={() => authClient.signOut()} label="登出" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="登錄" />
                <MenuItem onClick={registerModal.onOpen} label="註冊" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
