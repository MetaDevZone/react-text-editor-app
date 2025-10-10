export const getBaseDomain = () => {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }
  return "";
};
