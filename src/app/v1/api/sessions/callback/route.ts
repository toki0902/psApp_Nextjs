// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { errorHandler } from "@/src/app/error/errorHandler";
// import { UnAuthorizeError } from "@/src/app/error/errors";

// export const GET = async (req: NextRequest): Promise<NextResponse> => {
//   try {
//     const JWT_str = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//       raw: true,
//     });

//     const JWT = await getToken({
//       req,
//       secret: process.env.NEXTAUTH_SECRET,
//     });

//     if (!JWT_str || !JWT) {
//       throw new UnAuthorizeError(
//         "JWTトークンが無効です。",
//         "JWT token is not valid",
//       );
//     }

//     const response = NextResponse.redirect(new URL("/", process.env.ROOT_URL));

//     return response;
//   } catch (err) {
//     return errorHandler(err);
//   }
// };
