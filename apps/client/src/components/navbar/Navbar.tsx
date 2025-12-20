"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { app_name } from "@/src/const/bussiness";
import { cn } from "@/lib/utils";
import SignInCard from "../SignInCard";
import BiggerNav from "./BiggerNav";

interface NavItem {
  title?: string;
  icon?: any;
  onClick?: () => void;
}

export default function Navbar() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [signInCard, setOpenSignInCard] = useState(false);

  const navArray: NavItem[] = [
    { title: app_name },
    { title: "About" },
    { title: "Projects" },
    {
      title: "Sign In",
      onClick: () => setOpenSignInCard(true),
    },
    {
      icon: FaBars,
      onClick: () => setOpenNavbar((prev) => !prev),
    },
  ];

  return (
    <>
      {/* MAIN NAVBAR */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full h-16 px-10",
          "flex items-center justify-between",
          "text-white text-xl",
          "z-999", 
          openNavbar && "hidden"
        )}
      >
        {navArray.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className="cursor-pointer hover:opacity-80 flex items-center gap-2"
          >
            {item.icon && <item.icon />}
            {item.title}
          </div>
        ))}
      </nav>

      {/* FULL SCREEN NAV */}
      <AnimatePresence>
        {openNavbar && <BiggerNav setOpenNavbar={setOpenNavbar} />}
      </AnimatePresence>

      {/* SIGN IN MODAL */}
      {signInCard && (
        <SignInCard setOpenSignInCard={setOpenSignInCard} />
      )}
    </>
  );
}
