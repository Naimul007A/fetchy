import { useMemo } from "react";

export const useWhitelisted = (allowedDomains: string[]) => {
  const regex = useMemo(() => {
    const joined = allowedDomains.map((d) => d.replace(/\./g, "\\.")).join("|");
    return new RegExp(`^https?://(www\\.)?(${joined})`, "i");
  }, [allowedDomains]);

  const prepareUrl = (url: string) => {
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      return "https://" + trimmed;
    }
    return trimmed;
  };

  const isValid = (url: string) => {
    return { isValid: regex.test(prepareUrl(url)), url: prepareUrl(url) };
  };

  return { isValid, prepareUrl };
};
