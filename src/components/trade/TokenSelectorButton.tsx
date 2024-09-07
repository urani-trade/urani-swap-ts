import Image from "next/image";
import { Token } from "@/lib/interfaces/tokensList";

interface TokenSelectorButtonProps {
  onClick: () => void;
  token: Token | null;
}

export default function TokenSelectorButton({
  onClick,
  token,
}: TokenSelectorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center text-center font-medium rounded-xl bg-white hover:bg-cyan hover:text-black transition-all px-3 py-1 shadow select-none text-purple min-h-11 min-w-32"
    >
      {!token ? (
        "Select a token"
      ) : (
        <>
          <Image
            className="rounded-full mr-3 max-w-auto"
            width={30}
            height={30}
            src={token.logoURI}
            alt=""
          />
          <span className="font-semibold">{token.symbol}</span>
          <span className="material-symbols-rounded ml-1 -mr-1">
            keyboard_arrow_down
          </span>
        </>
      )}
    </button>
  );
}
