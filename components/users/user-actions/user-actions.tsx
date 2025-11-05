import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { Ellipsis } from "lucide-react";
import { ReactNode, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { User } from "@/lib/interfaces";
import UserActionModal from "./user-action-modal/user-action-modal";
import EditUserForm from "./edit-user-form/edit-user-form";
import DeleteUserForm from "./delete-user-form/delete-user-form";

export interface UserActionsProps {
  user: User;
}

export default function UserActions({ user }: UserActionsProps) {
  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
  const [selectedForm, setSelectedForm] = useState<{
    formTitle: string;
    form: ReactNode;
  }>();

  const actions: { name: string; modalTitle: string; form: ReactNode }[] = [
    {
      name: "Edytuj",
      modalTitle: "Edytuj użytkownika",
      form: <EditUserForm selectedUser={user} onClose={onClose} />,
    },
    {
      name: "Usuń",
      modalTitle: "Usuń użytkownika",
      form: (
        <div className="flex flex-col gap-4">
          <p>
            Czy na pewno chcesz usunąć konto użytkownika: <br />
            <span className="font-semibold">{user.email}</span>
          </p>
          <DeleteUserForm selectedUser={user} onClose={onClose} />
        </div>
      ),
    },
  ];

  const handlePress = (formTitle: string, form: ReactNode) => {
    setSelectedForm({ formTitle, form });
    onOpen();
  };

  return (
    <>
      <Dropdown className="dark text-white">
        <DropdownTrigger className="flex items-center justify-center">
          <Button isIconOnly className="bg-transparent">
            <Ellipsis size={24} color="#ffffff" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="bordered" items={actions}>
          {(action) => (
            <DropdownItem
              key={action.name}
              onPress={() => handlePress(action.modalTitle, action.form)}
            >
              {action.name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>

      <UserActionModal
        title={selectedForm?.formTitle}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {selectedForm?.form}
      </UserActionModal>
    </>
  );
}
