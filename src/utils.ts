export const convertToLocal = (raw: string) => {
  const originalDate: Date = new Date(raw);
  originalDate.setUTCHours(originalDate.getUTCHours() + 8);

  return originalDate.toISOString().slice(0, 19).replace("T", " ");
};
