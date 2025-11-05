import { Gender, Status, User } from "@/lib/interfaces";
import { Mars, Venus } from "lucide-react";
import { ReactNode } from "react";
import UserActions from "../user-actions/user-actions";

interface CustomUser extends User {
  actions: ReactNode;
}

interface CellProps {
  colKey: keyof CustomUser;
  value: string | number | Status | Gender;
  user: User;
}

export function CellContent({ colKey, value, user }: CellProps) {
  const isStatus = colKey === "status";
  const isGender = colKey === "gender";
  const isActions = colKey === "actions";

  if (isStatus) {
    return (
      <div>
        <p className={`${value === "active" ? "text-success" : "text-danger"}`}>
          {value === "active" ? "Aktywny" : "Nieaktywny"}
        </p>
      </div>
    );
  } else if (isGender) {
    return (
      <div className="flex gap-1 items-center">
        {value === "male" ? (
          <Mars size={16} color="#fff" />
        ) : (
          <Venus size={16} color="#fff" />
        )}
        <p>{value === "male" ? "Mężczyzna" : "Kobieta"}</p>
      </div>
    );
  } else if (isActions) {
    return (
      <div>
        <UserActions user={user} />
      </div>
    );
  } else {
    return (
      <div>
        <p>{value}</p>
      </div>
    );
  }
}
