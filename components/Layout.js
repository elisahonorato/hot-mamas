import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import Image from 'next/image';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // State para controlar si el menú está abierto o no


  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - HotMamas' : 'HotMamas'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer
        toastClassName={() => "text-sm font-white font-med block p-3 flex justify-between items-center bg-primary-dark rounded-lg"}
        bodyClassName={() => "text-sm font-white font-med block p-3 flex justify-between items-center bg-primary-dark rounded-lg"}
        position="bottom-left"
        autoClose={3000}
        progressClassName={() => "bg-primary-light"}
        pauseOnHover={false}
      />
      <div className={`flex flex-col justify-between bg-primary-dark text-primary-light w-full font-body`}>
        <header className="bg-primary-dark z-10 fixed w-full">
          <nav className={`flex h-12 items-center px-4 justify-between shadow-md `}>
            <Link href="/" className="text-lg font-bold">
              <Image src="/logo.svg" alt="HotMamas" width={50} height={50} />
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden  justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
            </form>
            <div className="flex items-center">
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold font-body text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
            {/* Menú lateral */}
            <button
              className=" text-white focus:outline-none"
              onClick={() => setMenuOpen(true)} // Abrir el menú lateral al hacer clic en el botón
            >
              <svg

                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {/* Menú lateral */}
            {menuOpen && (
              <div className='flex flex-row-reverse inset-0 fixed min-h-max  '>
                <div className="flex flex-col inset-0 w-1/3 bg-primary-dark z-1000" onClick={() => setMenuOpen(false)}>
                  <div className="flex flex-col justify-between items-center px-4 py-6">
                    <button
                      className="text-primary-light focus:outline-none md:hidden bg-opacity-10 "
                      onClick={() => setMenuOpen(false)} // Cerrar el menú lateral al hacer clic en el botón de cerrar
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="px-4 flex flex-col gap-2 w-full left-0">
                    <Link href="/">Home</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/cart">Cart</Link>
                    {status === 'loading' ? (
                      'Loading'
                    ) : session?.user ? (
                      <>
                        <DropdownLink href="/profile">Profile</DropdownLink>
                        <DropdownLink href="/order-history">Order History</DropdownLink>
                        {session.user.isAdmin && (
                          <DropdownLink href="/admin/dashboard">Admin Dashboard</DropdownLink>
                        )}
                        <a href="#" onClick={logoutClickHandler}>Logout</a>
                      </>
                    ) : (
                      <Link href="/login">Login</Link>
                    )}
                  </div>
                </div>
                <div className='flex w-2/3 bg-primary-dark bg-opacity-40  backdrop-blur-sm h-screen'></div>
              </div>
            )}
          </nav>
        </header>

        <main className={`bg-colored-light text-primary-dark mt-20 font-body ${menuOpen ? 'hidden' : 'flex'}`}>
          <div className="container mx-auto">
          {children}
          </div>
          </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Copyright {new Date().getFullYear()} Elisa Honorato</p>
        </footer>
      </div>
    </>
  );
}
