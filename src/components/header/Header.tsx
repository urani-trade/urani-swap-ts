"use client";

import { 
  CustomFlowbiteTheme, 
  Flowbite, 
  Navbar,
  } from "flowbite-react";

import Image from "next/image";
import Link from "next/link";
import Underscore from "../utils/Underscore";
import WalletConnectionButton from "../wallet-connect/WalletConnectionButton";

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: "sticky top-0 flex z-50 justify-center w-full text-sm p-5",
      rounded: {
        on: "rounded",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "flex flex-wrap max-w-screen-xl w-full items-center justify-between",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto grow md:ml-4",
      list: "mt-4 flex flex-col md:items-center md:mt-0 md:flex-row md:space-x-14 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0 text-1xl",
      active: {
        on: "bg-cyan text-cream md:bg-transparent md:text-cyan-dark",
        off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-cyan-700",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  },
  dropdown: {
    floating: {
      animation: "transition-opacity",
      arrow: {
        base: "absolute z-10 h-2 w-2 rotate-45",
        style: {
          light: "bg-cream",
          auto: "bg-cream",
        },
        placement: "-4px",
      },
      base: "z-10 min-w-52 divide-y divide-gray-100 rounded shadow focus:outline-none",
      content: "py-1 text-sm text-purple ",
      divider: "my-1 h-px bg-gray-100",
      header: "block px-4 py-2 text-sm text-purple ",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex min-w-52 cursor-pointer items-center justify-start px-4 py-2 text-sm text-purple hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        light: "border border-gray-200 bg-cream text-purple",
        auto: "border border-gray-200 bg-cream text-purple",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  },
};

export default function Header() {
  return (
    <header>
      <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid>
          <Navbar.Brand as={Link} href="https://urani.trade/">
            <div className="relative flex w-full items-center justify-between">
              <Image
                className="relative mr-14"
                src="/assets/logos/space/space_logo_tiny.png"
                alt="Urani Logo"
                width={40}
                height={40}
                priority
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>


            <div className="relative group text-purple font-bold text-2xl py-2 pl-3 pr-4 md:p-0">
              <Navbar.Link as={Link} href="https://swap.urani.trade/">
                <div className="relative group text-purple font-bold text-2xl">
                  <span>Swap</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="relative group text-purple font-bold text-2xl py-2 pl-3 pr-4 md:p-0">
              <Navbar.Link as={Link} href="/dashboard">
                <div className="relative group text-purple font-bold text-2xl">
                  <span>Dashboard</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="relative group text-purple font-bold text-2xl py-2 pl-3 pr-4 md:p-0">
              <Navbar.Link as={Link} href="/astronomy">
                <div className="relative group text-purple font-bold text-2xl">
                  <span>Astronomy</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="grow"></div>

            <WalletConnectionButton />
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </header>
  );
}
