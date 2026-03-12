import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export const Logo = ({ className = "", width = 120, height = 120, showText = false }: LogoProps) => {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/ADS-logo.webp"
          alt="ADS Logo"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
            A<span className="text-brand-orange">D</span>S
          </h1>
          <span className="text-[8px] uppercase tracking-widest font-bold text-brand-orange mt-0.5">
            Fly Your Passion
          </span>
        </div>
      )}
    </Link>
  );
};
