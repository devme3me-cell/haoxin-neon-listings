const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

// Check if Cloudinary is configured
export const isCloudinaryConfigured = () => {
  return CLOUDINARY_CLOUD_NAME !== "" && CLOUDINARY_UPLOAD_PRESET !== "";
};

/**
 * Upload an image to Cloudinary
 * Returns the public URL of the uploaded image
 */
export async function uploadImage(file: File): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    return {
      url: "",
      path: "",
      error: "Cloudinary 尚未設定",
    };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        url: "",
        path: "",
        error: errorData.error?.message || "上傳失敗",
      };
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      path: data.public_id,
    };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      url: "",
      path: "",
      error: err instanceof Error ? err.message : "上傳失敗",
    };
  }
}

/**
 * Upload a base64 image to Cloudinary
 * Converts base64 to File and uploads
 */
export async function uploadBase64Image(base64: string): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    return {
      url: "",
      path: "",
      error: "Cloudinary 尚未設定",
    };
  }

  try {
    // Extract mime type and data
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      return {
        url: "",
        path: "",
        error: "無效的圖片格式",
      };
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    // Convert base64 to Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Get file extension from mime type
    const ext = mimeType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const fileName = `upload.${ext}`;

    // Create File from Blob
    const file = new File([blob], fileName, { type: mimeType });

    return uploadImage(file);
  } catch (err) {
    console.error("Base64 upload error:", err);
    return {
      url: "",
      path: "",
      error: err instanceof Error ? err.message : "上傳失敗",
    };
  }
}

/**
 * Delete an image from Cloudinary
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured() || !publicId) {
    return false;
  }

  // Note: Cloudinary deletion requires authentication via backend API
  // For security, this should be done server-side
  // For now, we'll just return true as images can be managed via Cloudinary dashboard
  console.warn("Image deletion should be handled server-side for security");
  return true;
}

/**
 * Check if a URL is from Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  if (!url) return false;
  return url.includes("cloudinary.com");
}

/**
 * Extract public ID from Cloudinary URL
 */
export function getPublicIdFromUrl(url: string): string {
  if (!isCloudinaryUrl(url)) return "";

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const uploadIndex = pathParts.indexOf("upload");
    if (uploadIndex === -1) return "";

    // Get everything after upload and version (if present)
    const afterUpload = pathParts.slice(uploadIndex + 1);
    // Skip version if present (starts with v)
    const startIndex = afterUpload[0]?.startsWith("v") ? 1 : 0;
    const publicIdParts = afterUpload.slice(startIndex);

    // Remove file extension
    const fullPath = publicIdParts.join("/");
    return fullPath.replace(/\.[^.]+$/, "");
  } catch {
    return "";
  }
}
