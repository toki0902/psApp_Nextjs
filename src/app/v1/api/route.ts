import { NextResponse } from "next/server";
import { createConnectionPool } from "@/src/infrastructure/db/MySQLConnection";
import { MySQLUserGateway } from "@/src/infrastructure/user/MySQLUserGateway";

const userGateway = new MySQLUserGateway();

export const GET = async (req: Request) => {
  const user = await userGateway.findById("1");

  console.log(user);
  return NextResponse.json({ user });
};
