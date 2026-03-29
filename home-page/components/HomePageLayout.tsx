import Image from "next/image";
import { BrandTicker } from "../../components";
import macetaImage from "../../imagenes/home-page/maceta.png";
import natureImage from "../../imagenes/home-page/nature-1.png";
import { HomeTextImageCard } from "./HomeTextImageCard";

export function HomePageLayout() {
  return (
    <>
      <section
        id="inicio"
        className="relative isolate flex min-h-[calc(100svh-72px)] w-full items-end overflow-hidden bg-[var(--color-surface)] text-[var(--color-text-primary)]"
      >
        <Image
          src={natureImage}
          alt="Paisaje natural"
          fill
          priority
          className="object-cover object-[74%_18%] min-[769px]:object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[color:rgba(250,249,246,0.24)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[color:rgba(250,249,246,0.96)] via-[color:rgba(250,249,246,0.72)] to-transparent min-[769px]:h-40" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-14 pt-24 sm:px-10 lg:px-14">
          <h1 className="hero-enter-title max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Cultivamos espacios vivos que se sienten naturales.
          </h1>
          <p className="hero-enter-copy mt-4 max-w-xl text-base leading-7 text-[color:rgba(75,54,33,0.88)] sm:text-lg">
            Disenamos ambientes verdes con una experiencia visual limpia, organica y en armonia con
            cada detalle de tu entorno.
          </p>
        </div>
      </section>

      <BrandTicker className="mt-[80px]" />

      {Array.from({ length: 4 }).map((_, index) => (
        <HomeTextImageCard
          key={`home-text-image-card-${index + 1}`}
          sectionId={index === 0 ? "servicios" : `servicios-${index + 1}`}
          title="Lorem Ipsum"
          subtitle="Subtitulo corto"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."
          cardTitle="Maceta Natural"
          cardDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          imageSrc={macetaImage}
          imageAlt="Maceta decorativa"
        />
      ))}
    </>
  );
}
