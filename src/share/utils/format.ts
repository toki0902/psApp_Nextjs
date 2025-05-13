import { formatISO, parse } from "date-fns";
import { toZonedTime, format, fromZonedTime } from "date-fns-tz";

/**
 * UTC ISO文字列やDateを MySQL DATETIME形式（JST）に変換
 */
export const toMysqlDatetimeFromUtc = (date: string | Date): string => {
  const jstDate = toZonedTime(date, "Asia/Tokyo");
  return format(jstDate, "yyyy-MM-dd HH:mm:ss", { timeZone: "Asia/Tokyo" });
};

/**
 * MySQL DATETIME形式（JST）を UTC ISO に変換
 */
export const toUtcIsoFromMysqlDatetime = (mysqlDateTime: string): Date => {
  const jstDate = parse(mysqlDateTime, "yyyy-MM-dd HH:mm:ss", new Date());
  return jstDate; // e.g., "2025-04-19T06:20:57Z"
};
