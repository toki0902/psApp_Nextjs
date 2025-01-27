export const buildEncodedUrl = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_ROOT_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_ROOT_URL is not defined");
  }
  return encodeURI(`${baseUrl}${path}`);
};
