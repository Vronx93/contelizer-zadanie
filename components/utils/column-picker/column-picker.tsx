"use client";

import { SharedSelection } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface ColumnPickerProps {
  selectedColumns: {
    state: Column[];
    setStateFn: (value: Column[]) => void;
  };
  allColumns: Column[];
}

export default function ColumnPicker({
  selectedColumns,
  allColumns,
}: ColumnPickerProps) {
  const handleSelectionChange = (keys: SharedSelection) => {
    let selectedKeys: Set<string>;

    if (keys === "all") {
      selectedKeys = new Set(allColumns.map((col) => col.key));
    } else {
      selectedKeys = new Set(Array.from(keys).map(String));
    }

    const newSelected = allColumns.filter((col) => selectedKeys.has(col.key));
    selectedColumns.setStateFn(newSelected);
  };

  return (
    <Select
      selectionMode="multiple"
      selectedKeys={new Set(selectedColumns.state.map((col) => col.key))}
      onSelectionChange={handleSelectionChange}
      classNames={{ popoverContent: "dark text-white" }}
      variant="bordered"
      label="Wybrane kolumny"
      className="dark w-full md:ml-auto md:max-w-[420px]"
      size="sm"
      radius="lg"
    >
      {allColumns.map((col) => (
        <SelectItem key={col.key}>{col.label}</SelectItem>
      ))}
    </Select>
  );
}
