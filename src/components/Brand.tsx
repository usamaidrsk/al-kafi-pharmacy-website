import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  compact?: boolean;
  inverse?: boolean;
  showMotto?: boolean;
};

const Brand = ({
  compact = false,
  inverse = false,
  showMotto = false,
}: BrandProps) => {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3"
      aria-label="Alkaafi Pharmacy home"
    >
      <span
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_14px_32px_rgba(1,46,32,0.18)] transition-transform duration-300 group-hover:-translate-y-0.5 ${
          inverse
            ? "ring-2 ring-[#d5a94e]/35"
            : "ring-1 ring-[#012e20]/10 ring-offset-2 ring-offset-[#faf5ef]"
        }`}
      >
        <Image
          src="/alkaafi-logo.jpeg"
          alt=""
          width={640}
          height={640}
          priority
          className="h-14 w-14 object-cover md:h-16 md:w-16"
        />
      </span>
      {!compact && (
        <span className="leading-none">
          <span
            className={`brand-title block text-[1.08rem] ${
              inverse ? "text-[#faf5ef]" : "text-[#012e20]"
            }`}
          >
            AL KAFI
          </span>
          <span className="mt-1 flex items-center gap-2">
            <span
              className={`h-px w-5 ${
                inverse ? "bg-[#d5a94e]/75" : "bg-[#d5a94e]/85"
              }`}
            />
            <span className="brand-subtitle text-[10px]">Pharmacy</span>
            <span
              className={`h-px w-5 ${
                inverse ? "bg-[#d5a94e]/75" : "bg-[#d5a94e]/85"
              }`}
            />
          </span>
          {showMotto && (
            <span
              className={`brand-motto mt-2 block text-[9px] ${
                inverse ? "text-[#faf5ef]/72" : "text-[#012e20]/70"
              }`}
            >
              Care • Trust • Wellness
            </span>
          )}
        </span>
      )}
    </Link>
  );
};

export default Brand;
