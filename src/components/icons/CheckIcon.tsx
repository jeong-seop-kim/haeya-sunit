interface CheckIconProps {
  checked: boolean;
  className?: string;
}

export default function CheckIcon({ checked, className = "" }: CheckIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="transition-colors duration-200"
        cx="12"
        cy="12"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
        fill={checked ? "currentColor" : "none"}
      />
      {checked && (
        <path
          className="animate-check"
          d="M8 12L11 15L16 10"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
