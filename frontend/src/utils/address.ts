export const isAddressEqual = (addr1: string, addr2: string): boolean => {
  let finalAddr1 = addr1.toLowerCase();
  let finalAddr2 = addr2.toLowerCase();

  // Remove padding 0xs
  if (finalAddr1.startsWith("0x")) {
    finalAddr1 = finalAddr1.slice(2);
  }
  if (finalAddr2.startsWith("0x")) {
    finalAddr2 = finalAddr2.slice(2);
  }

  while (finalAddr1.startsWith("0")) {
    finalAddr1 = finalAddr1.slice(1);
  }

  while (finalAddr2.startsWith("0")) {
    finalAddr2 = finalAddr2.slice(1);
  }

  return finalAddr1 === finalAddr2;
};

export const normalizeAddress = (addr: string) => {
  let finalAddr = addr.toLowerCase();
  if (finalAddr.startsWith("0x")) {
    finalAddr = finalAddr.slice(2);
  }
  return `0x${finalAddr.padStart(64, "0")}`;
};
