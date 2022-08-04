import React from 'react'
import Link from 'next/link';
import Logo from '../public/site-logo.svg';

const Navbar = (links) => {
  return (
    <nav>
      
      <img src="/site-logo.svg" />
      <Link href={links[0].path}><a>{links[0].name}</a></Link>
      <Link href={links[3].path}><a>{links[3].name}</a></Link>
    </nav>
  );
}

export default Navbar;
