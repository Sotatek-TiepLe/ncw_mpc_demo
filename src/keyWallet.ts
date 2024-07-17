const DEMO_KEY = "DEMO_APP:key";

export const loadPrivateKey = (walletId: string, passphraseId: string) => {
  return localStorage.getItem(`${DEMO_KEY}-${walletId}-${passphraseId}`);
};

export const savePrivateKey = (walletId: string, passphraseId: string, KEY: string) => {
  localStorage.setItem(`${DEMO_KEY}-${walletId}-${passphraseId}`, KEY);
};
