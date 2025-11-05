"use client";

import AddUserForm from "@/components/users/user-actions/add-user-form/add-user-form";
import UserActionModal from "@/components/users/user-actions/user-action-modal/user-action-modal";
import UsersTable from "@/components/users/users-table/users-table";
import ColumnPickerNoSSR from "@/components/utils/column-picker/column-picker-no-ssr";
import Searchbar from "@/components/utils/searchbar/searchbar";
import useColumnPicker from "@/hooks/useColumnsPicker";
import useUsers from "@/hooks/useUsers";
import { TableSort, User } from "@/lib/interfaces";
import { search, sortByKey } from "@/lib/utils";
import { Button, useDisclosure } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { PlusCircle } from "lucide-react";
import { useMemo, useState } from "react";

const columns = [
  { key: "id", label: "ID", sortable: false },
  { key: "email", label: "E-mail", sortable: true },
  { key: "name", label: "Imię i nazwisko", sortable: true },
  { key: "gender", label: "Płeć", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "actions", label: "Działania", sortable: false },
];

type UsersTableSort = TableSort<User>;

export default function AdminUsersPage() {
  const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure();
  const { setSelectedColumns, selectedColumns } = useColumnPicker({
    storageName: "users-selected-columns",
    startingColumns: columns,
  });
  const [queryString, setQueryString] = useState<string | null>(null);
  const [sort, setSort] = useState<UsersTableSort | null>(null);
  const { users, isLoading, errorMessage } = useUsers();
  const visibleUsers = useMemo(() => {
    if (!users || users.length === 0) return [];
    const filtered = queryString ? search(users, queryString) : users;
    const sorted = sort
      ? sortByKey(filtered, sort.colName, sort.direction)
      : sortByKey(filtered, "status", "ascending");

    return sorted;
  }, [users, sort, queryString]);

  return (
    <>
      <h1 className="text-xl font-bold">Zarządzaj użytkownikami</h1>

      <div className="my-6" />

      <div className="flex flex-col gap-3 w-full md:flex-row md:justify-between md:items-end">
        <div className="flex flex-col gap-3 w-full md:w-[420px]">
          <>
            <Button
              onPress={onOpen}
              size="lg"
              color="primary"
              variant="bordered"
              startContent={<PlusCircle />}
            >
              Dodaj użytkownika
            </Button>
            <UserActionModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              title="Nowy użytkownik"
            >
              <AddUserForm onClose={onClose} />
            </UserActionModal>
          </>
          <Searchbar
            state={{
              value: queryString,
              setValue: setQueryString,
            }}
          />
        </div>
        <ColumnPickerNoSSR
          selectedColumns={{
            state: selectedColumns,
            setStateFn: setSelectedColumns,
          }}
          allColumns={columns}
        />
      </div>

      <div className="my-3" />
      {errorMessage && (
        <div className="flex items-center justify-center w-full h-full">
          <strong className="font-semibold">{errorMessage}</strong>
        </div>
      )}
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full my-auto">
          <Spinner color="primary" size="lg" />
        </div>
      ) : (
        <UsersTable
          users={visibleUsers}
          selectedColumns={selectedColumns}
          sortDescriptor={
            sort
              ? { column: sort.colName, direction: sort.direction }
              : undefined
          }
          onSortChange={(descriptor) => {
            setSort({
              colName: descriptor.column as keyof User,
              direction: descriptor.direction,
            });
          }}
        />
      )}
    </>
  );
}
