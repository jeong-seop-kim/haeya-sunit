interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      className={`logo-rotate ${className}`}
      width="48"
      height="48"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M512 512m-400 0a400 400 0 1 0 800 0 400 400 0 1 0-800 0"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="80"
      />
      <path
        d="M512 512c0-220.914 179.086-400 400-400"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="80"
      />
      <path
        d="M512 512 L512 112"
        stroke="#FF6B00"
        strokeWidth="80"
        strokeLinecap="round"
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="512"
          y1="112"
          x2={512 + Math.cos((Math.PI * 2 * i) / 8) * 100}
          y2={112 - Math.sin((Math.PI * 2 * i) / 8) * 100}
          stroke="#FF6B00"
          strokeWidth="80"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
