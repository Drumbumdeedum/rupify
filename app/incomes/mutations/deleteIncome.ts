import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteIncome = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteIncome),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const income = await db.income.deleteMany({ where: { id } });

    return income;
  }
);
