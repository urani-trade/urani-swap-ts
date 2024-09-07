"use client";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { architype_bayer } from "../fonts/config";

export default function Soon() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex items-center justify-center">
        <h2
          className={`${architype_bayer.className} p-10 text-5xl md:text-9xl`}
        >
          soon.
        </h2>
      </main>
      <Footer />
    </div>
  );
}
