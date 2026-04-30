import * as React from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import {
  cldDownload,
  cldForVariant,
  cldFullRes,
  type CropVariant,
} from "@/lib/cloudinary";
import type { Photo } from "@/data/photos";

interface GalleryProps {
  photos: Photo[];
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function variantFor(photo: Photo): CropVariant {
  const bucket = hashId(photo.publicId) % 10;
  if (bucket < 6) return "native";
  if (bucket < 9) return "wide";
  return "hero";
}

function displayDimensions(photo: Photo, variant: CropVariant) {
  if (variant === "wide") {
    return { width: photo.width, height: Math.round(photo.width * (2 / 3)) };
  }
  if (variant === "hero") {
    return { width: photo.width, height: Math.round(photo.width * (9 / 16)) };
  }
  return { width: photo.width, height: photo.height };
}

const SRCSET_WIDTHS = [480, 800, 1200, 1800, 2400];

interface AlbumPhoto {
  key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSet: { src: string; width: number; height: number }[];
  download: string;
  downloadFilename: string;
  openUrl: string;
}

function buildAlbum(photos: Photo[]): AlbumPhoto[] {
  return photos.map((photo) => {
    const variant = variantFor(photo);
    const { width, height } = displayDimensions(photo, variant);
    const ratio = height / width;
    const srcSet = SRCSET_WIDTHS.map((w) => ({
      src: cldForVariant(photo.publicId, variant, w),
      width: w,
      height: Math.round(w * ratio),
    }));
    const filename = (photo.title ?? photo.id).replace(/\s+/g, "-");
    return {
      key: photo.id,
      src: cldForVariant(photo.publicId, variant, 1600),
      alt: photo.title ?? "Photograph by Cole Robinson",
      width,
      height,
      srcSet,
      download: cldDownload(photo.publicId, filename),
      downloadFilename: `${filename}.jpg`,
      openUrl: cldFullRes(photo.publicId),
    };
  });
}

export function Gallery({ photos }: GalleryProps) {
  const [index, setIndex] = React.useState(-1);

  const album = React.useMemo(() => buildAlbum(photos), [photos]);

  const slides = React.useMemo(
    () =>
      album.map((p) => ({
        src: p.src,
        alt: p.alt,
        width: p.width,
        height: p.height,
        srcSet: p.srcSet,
        downloadUrl: p.download,
        downloadFilename: p.downloadFilename,
      })),
    [album],
  );

  if (album.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-8 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          The gallery is empty right now — photos are being uploaded.
        </p>
      </div>
    );
  }

  return (
    <>
      <RowsPhotoAlbum
        photos={album}
        targetRowHeight={320}
        rowConstraints={{ singleRowMaxHeight: 560, minPhotos: 1, maxPhotos: 4 }}
        spacing={12}
        onClick={({ index: clickedIndex }) => setIndex(clickedIndex)}
        sizes={{
          size: "1152px",
          sizes: [
            { viewport: "(max-width: 1200px)", size: "calc(100vw - 48px)" },
          ],
        }}
        render={{
          wrapper: (props) => {
            const { className, ...rest } =
              props as React.HTMLAttributes<HTMLDivElement>;
            return (
              <div
                {...rest}
                className={`${className ?? ""} group photo-hover-wrapper`}
              />
            );
          },
          extras: (_, { photo }) => {
            const albumPhoto = photo as AlbumPhoto;
            return (
              <PhotoHoverActions
                downloadUrl={albumPhoto.download}
                downloadFilename={albumPhoto.downloadFilename}
                openUrl={albumPhoto.openUrl}
              />
            );
          },
        }}
      />
      <style>{photoHoverStyles}</style>
      <Lightbox
        open={index >= 0}
        index={index < 0 ? 0 : index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Download]}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        carousel={{ finite: false }}
        animation={{ fade: 250, swipe: 400 }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.94)" },
        }}
      />
    </>
  );
}

interface PhotoHoverActionsProps {
  downloadUrl: string;
  downloadFilename: string;
  openUrl: string;
}

function PhotoHoverActions({
  downloadUrl,
  downloadFilename,
  openUrl,
}: PhotoHoverActionsProps) {
  const stop = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="photo-hover-overlay">
      <a
        href={downloadUrl}
        download={downloadFilename}
        onClick={stop}
        onMouseDown={stop}
        aria-label="Download full resolution"
        className="photo-hover-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      </a>
      <a
        href={openUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stop}
        onMouseDown={stop}
        aria-label="Open full size in new tab"
        className="photo-hover-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      </a>
    </div>
  );
}

const photoHoverStyles = `
  .photo-hover-wrapper {
    position: relative;
  }
  .photo-hover-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 6px;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.22s ease, transform 0.22s ease;
    pointer-events: none;
    z-index: 2;
  }
  .photo-hover-wrapper:hover .photo-hover-overlay {
    opacity: 1;
    transform: translateY(0);
  }
  .photo-hover-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(6px);
    color: #fff;
    text-decoration: none;
    border: 1px solid rgba(255, 255, 255, 0.14);
    pointer-events: auto;
    transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }
  .photo-hover-btn:hover {
    background: rgba(0, 0, 0, 0.85);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }
  @media (hover: none) {
    .photo-hover-overlay {
      display: none;
    }
  }
`;
