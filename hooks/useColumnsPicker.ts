import useLocalStorage from "./useLocalStorage";

export interface ColumnPickerHookProps {
  storageName: string;
  startingColumns: { key: string; label: string }[];
}

export default function useColumnPicker({
  storageName,
  startingColumns,
}: ColumnPickerHookProps) {
  const [selectedColumns, setSelectedColumns] = useLocalStorage(
    storageName,
    startingColumns
  );

  return { setSelectedColumns, selectedColumns };
}
