export const REDIRECT = "REDIRECT";

// action creators

export const redirect = (link: string) => {
  return { type: REDIRECT, payload: link };
};
