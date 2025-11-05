import Link from "next/link";
import { Button } from "@heroui/button";
import { apps } from "@/lib/constants";
import { Card, CardBody, CardFooter } from "@heroui/card";

export default function Home() {
  return (
    <ul className="flex flex-col items-center gap-4 w-full">
      {apps.map((app, index) => (
        <li key={index} className="flex items-center w-full">
          <Card className="dark w-full p-6" shadow="md">
            <CardBody>{app.description}</CardBody>
            <CardFooter>
              <Button
                as={Link}
                color="primary"
                size="lg"
                href={app.path}
                className="w-full mx-auto sm:max-w-[320px]"
              >
                {app.name}
              </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}
