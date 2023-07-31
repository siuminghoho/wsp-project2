import formidable from "formidable";

const IMAGE_PATH = "./images/";

export const form = formidable({
  uploadDir: IMAGE_PATH,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 1024 ** 2 * 200, // the default limit is 1KB * 200
  filter: (part) => part.mimetype?.startsWith("image/") || false,
});