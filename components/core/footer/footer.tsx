import { SquareArrowOutUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="h-footer flex w-full max-w-3xl border-t border-gray-500 py-8 px-16 mx-auto">
      <p className="text-xs inline-flex gap-1.5">
        Created by{" "}
        <a
          href="https://portfolio-adam-wronski.vercel.app/"
          target="__blank"
          className="flex gap-1.5 items-center text-primary font-bold text-sm"
        >
          Adam Wroński{" "}
          <SquareArrowOutUpRight
            size={14}
            color="hsl(var(--heroui-primary) / 1)"
            aria-hidden
          />
        </a>
      </p>
    </footer>
  );
}
