export const apps = [
  {
    name: "Wgraj plik",
    path: "/text-modifier",
    description:
      "Losowo przestawia litery w wyrazach (z wyjątkiem pierwszej i ostatniej) we wgranym pliku tekstowym.",
  },
  {
    name: "Sprawdź PESEL",
    path: "/validate-pesel",
    description:
      "Sprawdza poprawność numeru PESEL zgodnie z oficjalnym formatem.",
  },
  {
    name: "Zobacz listę użytkowników",
    path: "/users",
    description:
      "Pobiera użytkowników z API, umożliwia ich wyszukiwanie i edycję danych.",
  },
];

export const API_URL = "https://gorest.co.in/public/v2";
export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
