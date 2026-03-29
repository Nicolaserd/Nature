import Image, { StaticImageData } from "next/image";

type HomeTextImageCardProps = {
  sectionId?: string;
  title: string;
  subtitle: string;
  description: string;
  cardTitle: string;
  cardDescription: string;
  imageSrc: StaticImageData;
  imageAlt: string;
};

export function HomeTextImageCard({
  sectionId,
  title,
  subtitle,
  description,
  cardTitle,
  cardDescription,
  imageSrc,
  imageAlt,
}: HomeTextImageCardProps) {
  return (
    <section id={sectionId} className="bg-[var(--color-surface)] py-14 sm:py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-14">
        <div>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-2 text-lg font-medium text-[var(--color-accent)]">{subtitle}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-[color:rgba(75,54,33,0.88)]">
            {description}
          </p>
        </div>

        <article className="rounded-3xl bg-[color:rgba(250,249,246,0.74)] p-4 shadow-[0_12px_34px_rgba(75,54,33,0.14)]">
          <div className="relative h-52 w-full overflow-hidden rounded-2xl sm:h-56">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-center" />
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug">{cardTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-[color:rgba(75,54,33,0.86)]">{cardDescription}</p>
        </article>
      </div>
    </section>
  );
}
