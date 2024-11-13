'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt="Havenly logo"
      src="/images/logo.png"
      className="hidden md:block cursor-pointer"
      width={100}
      height={100}
      priority
    />
  );
};

export default Logo;
