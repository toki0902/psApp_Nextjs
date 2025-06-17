import { endOfMonth, startOfMonth } from "date-fns";

export class User {
  constructor(
    public userId: string,
    public name: string,
    public image: string,
    public graduationYear: number | null,
  ) {}

  isMe(userId: string): boolean {
    return this.userId === userId || userId === "me";
  }

  getSearchRange = (): [Date, Date] => {
    const targetYear =
      this.graduationYear ||
      (new Date().getMonth() > 3
        ? new Date().getFullYear() + 1
        : new Date().getFullYear());

    const startDate = startOfMonth(new Date(targetYear - 5, 3));
    const endDate = endOfMonth(new Date(targetYear, 3));

    return [startDate, endDate];
  };
}
