'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div>
      <header className="relative container mx-auto px-6">
        <nav className="flex justify-center h-14 items-center" aria-label="navigation bar">
          <Link href="/">
            <Image priority src="logo.svg" width={160} height={24} alt="Memories Logo" />
          </Link>
        </nav>
      </header>
      <hr className="border-b-2 border-gray-100" />
    </div>
  );
}
