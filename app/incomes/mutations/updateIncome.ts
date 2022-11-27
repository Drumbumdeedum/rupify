import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateIncome = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateIncome),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const income = await db.income.update({ where: { id }, data });

    return income;
  }
);
