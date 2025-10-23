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


/**
 * `Image` is a responsive image component with built-in loading and error states.
 * It displays a spinner while loading, a fallback icon if the image fails to load,
 * and an optional caption overlay. Supports custom dimensions and styling.
 *
 * @component
 * @example
 * ```tsx
 * <Image
 *   src="/images/sample.jpg"
 *   alt="Sample Image"
 *   caption="This is a caption"
 *   width={300}
 *   height={200}
 *   className="rounded-lg"
 * />
 * ```
 *
 * @param props - Props for configuring the image display.
 * @param props.src - The source URL of the image.
 * @param props.alt - Alternative text for accessibility. Default is `"Image"`.
 * @param props.caption - Optional caption text displayed at the bottom of the image.
 * @param props.fallbackSrc - (Reserved) Optional fallback image source if the main image fails.
 * @param props.className - Additional Tailwind CSS classes for styling the container.
 * @param props.width - Optional width of the image container in pixels.
 * @param props.height - Optional height of the image container in pixels.
 * @param props.children - (Inherited from `HTMLDivElement`) Any nested content.
 *
 * @returns A styled image container with loading, error, and caption support.
 */
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
        <Spinner className="w-full h-full flex justify-center items-center" />
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
