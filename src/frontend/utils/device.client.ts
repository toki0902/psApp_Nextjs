export const isMobile = () => {
  const ua = navigator.userAgent;
  if (/iPhone|iPod|Android/i.test(ua)) return true;
  if (/Macintosh/.test(ua) && "ontouchend" in document) return true; // iPad対応
  return false;
};
