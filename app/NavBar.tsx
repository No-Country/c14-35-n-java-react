"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import longLogo from "@/public/long-logo.svg";
import logo from "@/public/logo.svg";
import Image from "next/image";

export interface Route {
  name: string;
  path: string;
}

const NavBar = () => {
  const routes: Route[] = [
    { name: "Inicio", path: "/" },
    { name: "Cursos", path: "/" },
    { name: "Contacto", path: "/contact" },
  ];
  const pathname = usePathname();

  const navLinks = routes.map((route) => {
    return (
      <li key={route.name}>
        <Link
          href={route.path}
          className={
            `/${pathname.split("/")[1]}` === route.path
              ? "font-bold underline bg-base-200"
              : "font-semibold"
          }
        >
          {route.name}
        </Link>
      </li>
    );
  });

  return (
    <header className="my-4">
      <nav className="px-0 navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="-ml-4 btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            href="/"
            className="text-xl font-bold normal-case hover:underline"
          >
            <Image src={longLogo} alt="Logo" className="w-32 hidden lg:block" />
            <Image src={logo} alt="Logo" className="w-12 lg:hidden" />
          </Link>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">{navLinks}</ul>
        </div>
        <div className="space-x-2 navbar-end">
          <Link
            href="/login"
            className="normal-case transition-all btn bg-base-300 hover:font-extrabold btn-sm lg:btn-md"
          >
            Iniciar Sesión
          </Link>
          <a className="normal-case btn btn-neutral btn-sm lg:btn-md">
            Registrate
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
