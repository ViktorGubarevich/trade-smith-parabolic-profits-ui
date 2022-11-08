import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { unsetToken } from "../lib/auth";

const Nav = ({ categories }) => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logout = () => {
    unsetToken();
    router.push("/");
  };

  return (
    <div className="flex flex-wrap items-center justify-between w-full p-2 md:py-0 text-lg text-gray-700 bg-white shadow-[0_4px_8px_0px_rgba(0,0,0,0.25)] fixed">
      <div>
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-3"
            src="/parabolic-logo-nav.png"
            width={200}
            height={50}
            alt="Parabolic Logo"
          />
        </Link>
      </div>
      <nav>
        <section className="flex xl:hidden">
          <div
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>
          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="pt-4 text-sm uppercase text-gray-700 mb-0 xl:flex xl:justify-between xl:pt-0">
              {categories &&
                categories.map((category) => {
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/category/${category.attributes.slug}`}
                        className="p-3 block hover:bg-[#ffb80b]"
                      >
                        {category.attributes.name}
                      </Link>
                    </li>
                  );
                })}
              <li>
                <Link
                  href="/portfolios"
                  className="p-3 block hover:bg-[#ffb80b]"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/master-class"
                  className="p-3 block hover:bg-[#ffb80b]"
                >
                  Master Class
                </Link>
              </li>
              <li>
                <Link href="/about" className="p-3 block hover:bg-[#ffb80b]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="p-3 block hover:bg-[#ffb80b]">
                  Faq
                </Link>
              </li>
              <button
                className="ml-2.5 py-2.5 px-5 block text-white font-semibold hover:text-[#212b38] bg-[#00ae42] rounded-full hover:bg-[#50ce50] cursor-pointer"
                onClick={logout}
              >
                LOGOUT
              </button>
            </ul>
          </div>
        </section>
        <ul className="hidden pt-4 text-sm uppercase text-gray-700 mb-0 xl:justify-between xl:flex xl:pt-0">
          {categories &&
            categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.attributes.slug}`}
                    className="p-3 block hover:bg-[#ffb80b]"
                  >
                    {category.attributes.name}
                  </Link>
                </li>
              );
            })}
          <li>
            <Link href="/portfolios" className="p-3 block hover:bg-[#ffb80b]">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/master-class" className="p-3 block hover:bg-[#ffb80b]">
              Master Class
            </Link>
          </li>
          <li>
            <Link href="/about" className="p-3 block hover:bg-[#ffb80b]">
              About
            </Link>
          </li>
          <li>
            <Link href="/faq" className="p-3 block hover:bg-[#ffb80b]">
              Faq
            </Link>
          </li>
          <button
            className="ml-2.5 py-2.5 px-5 block text-white font-semibold hover:text-[#212b38] bg-[#00ae42] rounded-full hover:bg-[#50ce50] cursor-pointer"
            onClick={logout}
          >
            LOGOUT
          </button>
        </ul>
      </nav>      
    </div>
  );
};

export default Nav;
