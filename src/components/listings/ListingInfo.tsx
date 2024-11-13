'use client';

import dynamic from 'next/dynamic';
import { IconType } from 'react-icons';

import useCountries from '@/hooks/useCountries';
import { SafeUser } from '@/types';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>旅居主人： {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} 客人</div>
          <div>{roomCount} 房間</div>
          <div>{bathroomCount} 浴室</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory icon={category.icon} label={category?.label} description={category?.description} />}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      {/*  <Map center={coordinates} /> */}
    </div>
  );
};

export default ListingInfo;
