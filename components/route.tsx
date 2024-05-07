import Link from "next/link";
import { ReactNode } from "react";
import type { Route as RouteProps } from "types";
import cn from "clsx";
import Image from "next/image";

export function Stat({
  type,
  value,
  centered,
  className,
}: {
  type: string;
  value: string | number | ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <li className={cn(centered ? "text-center" : "mr-5", className)}>
      <span className="block text-xs uppercase text-secondary">{type}</span>
      <strong className="text-xl font-normal text-primary">{value}</strong>
    </li>
  );
}

export const Route = ({
  route: { geoJson, distance, elevation, slug, color, type },
}: {
  route: RouteProps;
}) => {
  const { name } = geoJson.features[0].properties;

  return (
    <div>
      <Link
        href={`/${slug}`}
        key={name}
        className="relative block p-4 mb-5 transition border rounded border-primary hover:border-primary-hover"
      >
        <p className="font-semibold text-xl mb-1.5 text-primary">
          <span
            style={{ backgroundColor: color, content: "" }}
            className="inline-block w-[14px] h-[14px] rounded-full mr-3"
          />
          {name}
        </p>

        <ol className="flex">
          <Stat
            type="Distance"
            value={`${Math.round(distance * 10) / 10} km`}
          />
          <Stat type="Elevation" value={`${Math.round(elevation)} m`} />
        </ol>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-secondary absolute right-4 w-[20px] top-1/2 -translate-y-1/2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>

      <Image
        className="rounded pb-10"
        src="/halja.jpg"
        width={1000}
        height={100}
        alt="halja"
      />
    </div>
  );
};

export default Route;
