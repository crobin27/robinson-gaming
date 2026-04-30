const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

const base = () => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

export type CloudinaryTransform = string;

export function cldUrl(
  publicId: string,
  transform: CloudinaryTransform,
): string {
  return `${base()}/${transform}/${publicId}`;
}

export function cldThumb(publicId: string, width = 1400): string {
  return cldUrl(publicId, `w_${width},q_auto,f_auto,c_limit`);
}

export function cldLightbox(publicId: string, width = 2400): string {
  return cldUrl(publicId, `w_${width},q_auto,f_auto,c_limit`);
}

export function cldLqip(publicId: string): string {
  return cldUrl(publicId, "w_40,q_1,e_blur:1000,f_auto");
}

export type CropVariant = "native" | "wide" | "hero";

export function cldForVariant(
  publicId: string,
  variant: CropVariant,
  width: number,
): string {
  const base = `w_${width},q_auto,f_auto`;
  if (variant === "wide") {
    return cldUrl(publicId, `c_fill,g_auto,ar_3:2,${base}`);
  }
  if (variant === "hero") {
    return cldUrl(publicId, `c_fill,g_auto,ar_16:9,${base}`);
  }
  return cldUrl(publicId, `${base},c_limit`);
}

export function cldDownload(publicId: string, filename?: string): string {
  const attach = filename ? `fl_attachment:${filename}` : "fl_attachment";
  return cldUrl(publicId, `${attach},q_90,f_jpg`);
}

export function cldFullRes(publicId: string): string {
  return cldUrl(publicId, "q_auto,f_auto");
}
