import { NextResponse } from "next/server";
import { MySQLUserGateway } from "@/src/infrastructure/user/MySQLUserGateway";

const userGateway = new MySQLUserGateway();

export const GET = async () => {
  const user = await userGateway.findBySocialId("1");

  console.log(user);
  return NextResponse.json({ user });
};
