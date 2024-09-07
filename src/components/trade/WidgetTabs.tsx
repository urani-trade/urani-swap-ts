interface WidgetTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: "market" | "limit") => void;
}

export default function WidgetTabs({
  selectedTab,
  setSelectedTab,
}: WidgetTabsProps) {
  return (
    <div className="flex w-full font-bold cursor-pointer text-xl mb-4 justify-between">
      <div className="flex">
        <div
          className={`${
            selectedTab === "market" &&
            "text-purple-medium border-b-2 border-purple-medium"
          } text-base mr-4 flex items-center`}
          onClick={() => setSelectedTab("market")}
        >
          Market Order
        </div>
        <div
          className={`${
            selectedTab === "limit" &&
            "text-purple-medium border-b-2 border-purple-medium"
          } text-base mr-4`}
          onClick={() => setSelectedTab("limit")}
        >
          Limit Order
        </div>
      </div>
    </div>
  );
}
