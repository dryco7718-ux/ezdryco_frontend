interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  iconOnly?: boolean;
}

export function EZDRYLogo({
  size = 36,
  className = "",
  showText = true,
  textColor = "text-gray-900",
  iconOnly = false,
}: LogoProps) {
  const brandName = import.meta.env.VITE_BRAND_NAME || "EZDRY";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="14" fill="#0ea5e9" />
        <path
          d="M24 8C21.8 8 20 9.8 20 12C20 13.5 20.8 14.8 22 15.5V17H18C14.7 17 12 19.7 12 23C12 25.2 13.1 27.1 14.8 28.2L13 36H35L33.2 28.2C34.9 27.1 36 25.2 36 23C36 19.7 33.3 17 30 17H26V15.5C27.2 14.8 28 13.5 28 12C28 9.8 26.2 8 24 8Z"
          fill="white"
          opacity="0.15"
        />
        <path
          d="M17 20L13 25L17 27V38H31V27L35 25L31 20L28 22C27.2 22.6 26.1 23 25 23H23C21.9 23 20.8 22.6 20 22L17 20Z"
          fill="white"
        />
        <path
          d="M20 20L24 24L28 20"
          stroke="#0ea5e9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="12" r="2.5" fill="white" opacity="0.9" />
        <path d="M24 9V10.5M24 13.5V15M21 12H22.5M25.5 12H27" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" />
        <circle cx="38" cy="10" r="2" fill="white" opacity="0.6" />
        <circle cx="10" cy="38" r="1.5" fill="white" opacity="0.4" />
      </svg>

      {!iconOnly && showText && (
        <div>
          <span className={`font-extrabold text-lg leading-none ${textColor}`}>{brandName}</span>
          <p className="text-sky-500 text-[9px] font-semibold leading-none tracking-wide">CLOTH SPA</p>
        </div>
      )}
    </div>
  );
}
