export const COLLAB_OPPORTUNITIES = ["insave.storysaver.for.ig"];

export const collabMessage = (custom) => {
  return {
    success: false,
    message:
      "Hi 👋 Looks like you're using Fetchy's API in your app (we're flattered 🥹). If you'd like to keep using our services, let's make it official ❤️",
    contact: "mailto:prassamin@gmail.com",
    note: "Unlicensed API usage may be blocked soon. We’d love to work with you instead!",
    ...custom,
  };
};
