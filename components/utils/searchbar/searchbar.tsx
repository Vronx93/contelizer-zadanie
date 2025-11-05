import { Input } from "@heroui/react";
import { SearchIcon } from "lucide-react";

export interface SearchbarProps {
  state: {
    value: string | null;
    setValue: (newValue: string | null) => void;
  };
}

export default function Searchbar({ state }: SearchbarProps) {
  const onClear = () => {
    state.setValue(null);
  };

  const onSearchChange = (value: string) => {
    if (value.length > 0) {
      state.setValue(value);
    } else {
      state.setValue(null);
    }
  };

  return (
    <Input
      variant="bordered"
      isClearable
      className="dark w-full text-white"
      placeholder="Szukaj..."
      startContent={<SearchIcon color="gray" />}
      value={state.value ? state.value : ""}
      onClear={() => onClear()}
      onValueChange={onSearchChange}
      size="lg"
    />
  );
}
