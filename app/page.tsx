import Link from "next/link";
import { Button } from "@heroui/button";
import { apps } from "@/lib/constants";

export default function Home() {
  return (
    <ul className="flex flex-col items-center gap-4 w-full">
      {apps.map((app, index) => (
        <li key={index} className="flex items-center w-full">
          <Button
            as={Link}
            color="default"
            variant="bordered"
            size="lg"
            href={app.path}
            className="w-full h-12 mx-auto sm:h-16 sm:w-full sm:max-w-[320px]"
          >
            {app.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
