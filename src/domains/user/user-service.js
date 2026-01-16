import prisma from "../../config/db.js";
import BaseError from "../../base_classes/base-error.js";

class UserService {
  async getAllUser(timeframe) {
    let where = {};
    let now = new Date();
    if (timeframe === "week") {
      const dateFrom = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 7
      );
      where.createdAt = { gte: dateFrom };
    }

    if (timeframe === "month") {
      const dateFrom = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      where.createdAt = { gte: dateFrom };
    }

    if (timeframe === "year") {
      const dateFrom = new Date(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      where.createdAt = { gte: dateFrom };
    }

    const users = await prisma.user.findMany({
      where,
    });
    return users;
  }
}

export default new UserService();
