export type Status = "active" | "inactive";

export type Gender = "male" | "female";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: Gender;
  status: Status;
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface TableSort<T extends object> {
  colName: keyof T;
  direction: "ascending" | "descending";
}

export interface APIFieldError {
  field: string;
  message: string;
}
