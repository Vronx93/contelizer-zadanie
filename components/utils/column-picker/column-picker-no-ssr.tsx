"use client";

import dynamic from "next/dynamic";
import { ColumnPickerProps } from "./column-picker";

const ColumnPicker = dynamic(
  () => import("@/components/utils/column-picker/column-picker"),
  { ssr: false }
);

export default function ColumnPickerNoSSR({
  allColumns,
  selectedColumns,
}: ColumnPickerProps) {
  return (
    <ColumnPicker allColumns={allColumns} selectedColumns={selectedColumns} />
  );
}
