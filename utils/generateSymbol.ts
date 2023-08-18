export const generateSymbol = (exchange: string, fromSymbol: string, toSymbol: string) => {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
      short,
      full: `${exchange}:${short}`,
  };
}
