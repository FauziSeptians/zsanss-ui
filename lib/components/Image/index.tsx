import Spinner from "@/components/Spinner";
import classNames from "@/utils/classNames";
import { useState } from "react";
import { ImageOff } from "lucide-react";

export type ImageProps = {
  src: string;
  alt?: string;
  caption?: string;
  fallbackSrc?: string;
  className?: string;
  width?: number;
  height?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Image({
  src,
  alt = "Image",
  caption,
  className = "",
  width,
  height,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={classNames(
        "relative w-full max-h-60 overflow-hidden shadow-md bg-gray-100 h-full",
        className
      )}
      style={{
        width,
        height,
      }}
    >
      {!loaded && !error && (
        <Spinner className="bg-red-200 w-full h-full flex justify-center items-center" />
      )}
      {!loaded && error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
          <ImageOff size={40} />
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          height={height}
          width={width}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={classNames(
            loaded ? "opacity-100" : "opacity-0",
            "object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
          )}
        />
      )}
      {caption && (
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm p-2">
          {caption}
        </div>
      )}
    </div>
  );
}
