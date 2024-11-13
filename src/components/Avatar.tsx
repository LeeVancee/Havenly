import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height={40}
      width={30}
      src={src || '/images/placeholder.jpg'}
      alt="avatar"
      priority
    />
  );
};

export default Avatar;
