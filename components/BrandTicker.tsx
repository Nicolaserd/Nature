import Image from "next/image";
import { HTMLAttributes } from "react";

type BrandLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

const brandLogos: BrandLogo[] = [
  { name: "Syngenta", src: "/marcas-cultivo/syngenta.svg", width: 150, height: 32 },
  { name: "Corteva", src: "/marcas-cultivo/corteva.svg", width: 150, height: 32 },
  { name: "Bayer", src: "/marcas-cultivo/bayer.svg", width: 130, height: 32 },
  { name: "BASF", src: "/marcas-cultivo/basf.svg", width: 132, height: 32 },
];

const baseTickerLogos = [...brandLogos, ...brandLogos, ...brandLogos];
const animatedTickerLogos = [...baseTickerLogos, ...baseTickerLogos];

type BrandTickerProps = HTMLAttributes<HTMLElement>;

export function BrandTicker({ className, ...rest }: BrandTickerProps) {
  return (
    <section
      aria-label="Marcas relacionadas con cultivo"
      className={`h-20 w-full overflow-hidden border-y border-[color:rgba(75,54,33,0.12)] bg-[color:rgba(96,108,56,0.1)] ${className ?? ""}`}
      {...rest}
    >
      <div className="brand-ticker-track flex h-full w-max items-center gap-10 pr-10">
        {animatedTickerLogos.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex h-full items-center"
            aria-hidden={index >= baseTickerLogos.length}
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={brand.width}
              height={brand.height}
              className="h-5 w-auto opacity-90"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
