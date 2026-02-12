const sortStrChars = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .split("")
    .sort()
    .join();
const isAnagram = (srt1: string, str2: string) =>
  sortStrChars(str2) === sortStrChars(srt1);
