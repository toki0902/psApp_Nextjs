export const isVerifiedPassPhrase = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ROOT_URL}/v1/api/cookies/pass-phrase`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(`${errorData.errorType!}: ${errorData.message}`);
    return false;
  } else {
    const data = await res.json();

    return data.success;
  }
};
