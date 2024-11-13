import Link from 'next/link';
import Container from '../Container';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories';

interface NavbarProps {
  currentUser?: any;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-cow items-center justify-between gap-3 md:gap-0">
            <Link href="/">
              <h3 className="text-xl font-bold text-rose-500 cursor-pointer">Havenly</h3>
            </Link>
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
