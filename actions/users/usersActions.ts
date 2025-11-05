import { API_TOKEN, API_URL } from "@/lib/constants";
import { User } from "@/lib/interfaces";

export const fetchUsers = async (): Promise<{
  users: User[];
  errorMessage?: string;
}> => {
  try {
    const res = await fetch(`${API_URL}/users`);

    if (!res.ok) {
      return {
        users: [],
        errorMessage: "Błąd podczas pobierania listy użytkowników.",
      };
    }

    return { users: await res.json() };
  } catch (error) {
    console.error(error);
    return { users: [], errorMessage: "Błąd serwera." };
  }
};

export const createUser = async (
  userData: Omit<User, "id">
): Promise<{ user: User | null; message: string }> => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      return {
        user: null,
        message: "Podczas tworzenia użytkownika wystąpił błąd.",
      };
    }

    return { user: await res.json(), message: "Utworzono użytkownika." };
  } catch (error) {
    console.error(error);

    return { user: null, message: "Błąd serwera." };
  }
};

export const updateUser = async (
  userData: { id: number } & Partial<Omit<User, "id">>
): Promise<{ user: User | null; message: string }> => {
  try {
    const res = await fetch(`${API_URL}/users/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      return {
        user: null,
        message: "Podczas aktualizacji danych użytkownika wystąpił błąd.",
      };
    }

    return { user: await res.json(), message: "Zaktualizowano użytkownika." };
  } catch (error) {
    console.error(error);

    return { user: null, message: "Błąd serwera." };
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!res.ok) {
      return {
        userId: null,
        message: "Podczas usuwania użytkownika wystąpił błąd.",
      };
    }

    return { userId: userId, message: "Usunięto użytkownika." };
  } catch (error) {
    console.error(error);

    return { userId: null, message: "Błąd serwera." };
  }
};
