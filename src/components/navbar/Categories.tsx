'use client';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';

export const categories = [
  {
    label: '海邊',
    icon: TbBeach,
    description: '該物業靠近海邊！',
  },
  {
    label: '風車',
    icon: GiWindmill,
    description: '該物業有風車！',
  },
  {
    label: '現代',
    icon: MdOutlineVilla,
    description: '該物業現代化！',
  },
  {
    label: '鄉村',
    icon: TbMountain,
    description: '該物業位於鄉村！',
  },
  {
    label: '泳池',
    icon: TbPool,
    description: '該物業有一個美麗的泳池！',
  },
  {
    label: '群島',
    icon: GiIsland,
    description: '該物業位於群島上！',
  },
  {
    label: '湖泊',
    icon: GiBoatFishing,
    description: '該物業靠近湖泊！',
  },
  {
    label: '滑雪',
    icon: FaSkiing,
    description: '該物業提供滑雪活動！',
  },
  {
    label: '城堡',
    icon: GiCastle,
    description: '該物業是一座古老的城堡！',
  },
  {
    label: '洞穴',
    icon: GiCaveEntrance,
    description: '該物業位於一個陰森的洞穴裡！',
  },
  {
    label: '露營',
    icon: GiForestCamp,
    description: '該物業提供露營活動！',
  },
  {
    label: '北極',
    icon: BsSnow,
    description: '該物業位於北極環境中！',
  },
  {
    label: '沙漠',
    icon: GiCactus,
    description: '該物業位於沙漠中！',
  },
  {
    label: '穀倉',
    icon: GiBarn,
    description: '該物業位於一個穀倉裡！',
  },
  {
    label: '豪華',
    icon: IoDiamond,
    description: '該物業全新豪華！',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params.get('category');

  const pathname = usePathname();
  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
