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

export function cldDownload(publicId: string, filename?: string): string {
  const attach = filename ? `fl_attachment:${filename}` : "fl_attachment";
  return cldUrl(publicId, `${attach},q_90,f_jpg`);
}
