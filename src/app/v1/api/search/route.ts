import { NextRequest, NextResponse } from "next/server";

import { FindVideosByKeyword } from "@/src/backend/application/search/FindVideosByKeyword";

import { MySQLVideoRepository } from "@/src/backend/infrastructure/repository/MySQLVideoRepository";

import { errorHandler } from "@/src/backend/interface/error/errorHandler";
import { createConnectionPool } from "@/src/backend/infrastructure/db/MySQLConnection";
import { auth } from "@/src/backend/interface/auth/auth";
import { Session } from "next-auth";
import { User } from "@/src/backend/domain/entities/User";

const pool = await createConnectionPool();
const videoRepository = new MySQLVideoRepository();
const findVideosByKeyword = new FindVideosByKeyword(videoRepository);

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const keyword = req.nextUrl.searchParams.get("q") || "";
    const isAllVideo = req.nextUrl.searchParams.get("isAllVideo") === "true";

    const session: Session | null = await auth();
    const user = session
      ? new User(
          session.userId,
          session.name,
          session.image || "",
          session.graduationYear,
        )
      : undefined;

    const videos = await findVideosByKeyword.run(
      pool,
      keyword,
      isAllVideo,
      user,
    );

    const resObj = videos.map((videoObj) => {
      return { ...videoObj, url: videoObj.url };
    });

    return new NextResponse(JSON.stringify({ videos: resObj }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return errorHandler(err);
  }
};
