export const toggleScroll = (status: boolean): void => {
  const body = document.body;

  body.style.overflowY = status ? "hidden" : "auto";
};
