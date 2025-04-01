import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/sun_bg.png"
      alt="logo"
      width={100}
      height={100}
      className={`logo-rotate ${className}`}
    />
  );
}
