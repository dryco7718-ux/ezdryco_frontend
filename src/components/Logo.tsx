interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textColor?: string;
  iconOnly?: boolean;
}

export function WashifyLogo({ size = 36, className = "", showText = true, textColor = "text-gray-900", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/ezdry-logo.svg" alt="EzDry logo" width={size} height={size} className="rounded-xl" />

      {!iconOnly && showText && (
        <div className={textColor}>
          <p className="font-extrabold text-lg leading-none tracking-tight">
            <span className="bg-sky-500 text-white px-1.5 py-0.5 rounded-md">Ez</span>
            <span className="text-sky-500 ml-1">Dry</span>
          </p>
          <p className="text-sky-500 text-[9px] font-semibold leading-none tracking-wide">LAUNDRY APP</p>
        </div>
      )}
    </div>
  );
}
