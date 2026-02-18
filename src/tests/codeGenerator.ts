export const createCodes = (start: number, end: number) => {
  const codesLength = end - start + 1;
  const generatedCodes = Array.from({ length: codesLength }, (_, i) => {
    const generatedCode = String(start + i);
    return generatedCode.padStart(String(end).length, "0");
  });
  const nonSortedCodes = generatedCodes.sort(() => Math.random() - 0.5);
  let generatedRepeats = 0;

  return () => {
    generatedRepeats++;
    if (generatedRepeats > end) {
      return "Error: all codes already use";
    }
    return nonSortedCodes[generatedRepeats];
  };
};
// const generateAnyCode = createCodes(1, 100);

// for (let i = 0; i < 102; i++) {
//   console.log(generateAnyCode());
// }
