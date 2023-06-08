import React from 'react';

// import Link
import { Link } from 'react-router-dom';

// import Logo
import Logo from '../assets/img/logo.svg'

const Header = () => {
  return (
    <header className='py-6 mb-12 border-b'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/'>
          <img src={Logo} alt="" />
        </Link>
        <div className='flex items-center gap-6'>
          {/* Button */}
          <Link className='hover:text-violet-900 transition' to=''>Log in</Link>
          <Link className='bg-violet-600 hover:text-violet-900 text-white px-4 py-3 rounded-lg transition' to=''>Sing in</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
