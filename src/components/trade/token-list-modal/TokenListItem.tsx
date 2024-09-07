import Image from "next/image";
import { TokenWithBalance } from "@/lib/interfaces/tokensList";

interface TokenListItemProps {
  item: TokenWithBalance;
  onClick: () => void;
}

export default function TokenListItem({ item, onClick }: TokenListItemProps) {
  return (
    <button
      key={item.address}
      className="w-full block hover:bg-cream-light transition-all px-4 py-2 my-2"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="text-4xl mr-3">
          <Image
            className="rounded-full"
            width={35}
            height={35}
            src={item.logoURI}
            alt=""
          />
        </div>
        <div className="flex flex-col flex-grow text-left">
          <span>{item.symbol}</span>
          <span className="text-xs text-gray-500">{item.name}</span>
        </div>
        {item.balance && (
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {item.balance.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
