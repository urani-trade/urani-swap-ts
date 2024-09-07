import { Select } from "@mantine/core";

const options = [
  { value: "5|m", label: "5 minutes" },
  { value: "30|m", label: "30 minutes" },
  { value: "1|h", label: "1 hour" },
  { value: "1|d", label: "1 day" },
  { value: "3|d", label: "3 days" },
  { value: "7|d", label: "7 days" },
  { value: "1|M", label: "1 month" },
];

interface SelectTimeProps {
  label?: string;
  setExpireTime: (value: string | null) => void;
  expireTime: string | null;
}

export default function SelectTime({
  label = "Expiry",
  setExpireTime,
  expireTime,
}: SelectTimeProps) {
  return (
    <div className="rounded-2xl border-2 border-cream-light hover:border-cyan bg-cream-light selection:text-purple-medium selection:bg-purple-medium-dark">
      <Select
        aria-label={label}
        label={label}
        value={expireTime}
        variant="unstyled"
        size="md"
        data={options}
        onChange={setExpireTime}
        classNames={{
          option: "hover:bg-cream hover:text-black",
          dropdown: "rounded-2xl border-2 border-cream-light",
          label: "ml-4 mt-3 text-sm font-bold text-purple",
          input:
            "text-right text-purple -mt-8 rounded-2xl text-xl border-0 focus:ring-0 focus:border-0 bg-transparent",
        }}
      />
    </div>
  );
}
