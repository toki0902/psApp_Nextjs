export const isCorrectPassword = (pass: string) => {
  return pass === process.env.NEXT_PUBLIC_PS_PASSWORD;
};
