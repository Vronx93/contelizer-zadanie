"use client";

import {
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Column, User } from "@/lib/interfaces";
import { CellContent } from "../cell-content/cell-content";

interface UserTableProps {
  users: User[];
  selectedColumns: Column[];
  sortDescriptor?: SortDescriptor;
  onSortChange: (descriptor: SortDescriptor) => void;
}

export default function UsersTable({
  users,
  selectedColumns,
  sortDescriptor,
  onSortChange,
}: UserTableProps) {
  return (
    <Table
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      isStriped
      className="dark"
    >
      <TableHeader>
        <>
          {selectedColumns.map((column) => (
            <TableColumn key={column.key} allowsSorting={column.sortable}>
              <span className="font-semibold">
                {column.label.toUpperCase()}
              </span>
            </TableColumn>
          ))}
        </>
      </TableHeader>
      <TableBody
        emptyContent={
          users
            ? "Brak użytkowników do wyświetlenia."
            : "Podczas pobierania danych wystąpił błąd."
        }
      >
        {users.map((user) => (
          <TableRow key={user.id}>
            {[
              ...selectedColumns.map((col) => (
                <TableCell key={col.key}>
                  <CellContent
                    colKey={col.key as keyof User}
                    user={user}
                    value={user[col.key as keyof User]}
                  />
                </TableCell>
              )),
            ]}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
