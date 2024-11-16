import { Video } from "@/src/domain/entities/Video";
import { MySQLVideoGateway } from "@/src/infrastructure/gateways/MySQLVideoGateway";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  const videoGateway = new MySQLVideoGateway();
  const values = await videoGateway.insert([
    new Video("asjdofass", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofagads", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofgxzcvasdas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofxzwjsdas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdozxcvhfas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofdghzcvas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjeeeedofas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdozxcedfas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofakjabbzs", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofhwdgs", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdofsas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdommmxfas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdoxcnseafas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdooiaejnasdfas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdsaywedxbofas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdojjjfas", 0, "aosdofas", "akshdfasdf"),
    new Video("asjdoqqqas", 0, "aosdofas", "akshdfasdf"),
  ]);
  return NextResponse.json({ values });
};
