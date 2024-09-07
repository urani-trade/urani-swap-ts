import Image from "next/image";
import { architype_bayer } from "@/app/fonts/config";
import { useMediaQuery } from "@mantine/hooks";

export default function Placeholder() {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-col items-center">
      <h1
        className={`${architype_bayer.className} tracking-tighter font-medium text-7xl md:text-[11rem] z-10 md:pb-2`}
      >
        urani swap
      </h1>

      <Image
        src="/assets/logos/space/space_logo_tiny.png"
        alt="Urani Logo"
        className="rotate-12 -mt-10 md:-mt-28"
        width={matches ? 400 : 150}
        height={matches ? 262.27 : 50}
        priority
      />

      <h2 className="font-bold text-center text-lg md:text-3xl p-6 max-w-xl md:max-w-3xl tracking-wide md:leading-10">
        Toxic-MEV minimization at the application layer.
      </h2>

      <h2 className="font-bold text-center text-lg md:text-3xl pb-6 max-w-xl md:max-w-3xl tracking-wide md:leading-10">
        <a href="https://docs.urani.ag/urani-labs/roadmap">
          Please follow our roadmap for our public launch.
        </a>
      </h2>

      <h3 className="font-bold text-center text-cyan text-xl md:text-4xl px-6 letter-shadow uppercase tracking-wider">
        Cannot wait?
      </h3>

      <h3 className="font-bold text-center text-cyan text-xl md:text-4xl px-6 letter-shadow uppercase tracking-wider">
        Become an MEV Agent operator
      </h3>

      <h3 className="font-bold text-center text-cyan text-xl md:text-4xl px-6 letter-shadow uppercase tracking-wider">
        and get earlier private access.
      </h3>
    </div>
  );
}
