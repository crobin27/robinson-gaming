import * as React from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import { cldDownload, cldForVariant, type CropVariant } from "@/lib/cloudinary";
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
      />
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
