import Image from "next/image";

export default function WidgetTitle() {
  return (
    <div className="flex relative">
      <div className="text-purple font-bold flex items-center text-3xl mb-2 md:mb-4 select-none">
        Urani
        <Image
          src="/assets/logos/space/space_logo_tiny.png"
          className="w-12 h-12 mx-4 spin"
          alt=""
          width={48}
          height={48}
        />
        Swap
      </div>
    </div>
  );
}
