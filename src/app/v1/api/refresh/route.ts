import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const googleResponse = await req.json();
  console.log(googleResponse);
};
