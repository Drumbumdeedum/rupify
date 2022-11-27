import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateExpense = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateExpense),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const expense = await db.expense.update({ where: { id }, data });

    return expense;
  }
);
