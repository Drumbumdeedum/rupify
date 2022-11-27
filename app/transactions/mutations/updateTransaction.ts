import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateTransaction = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
  type: z.string(),
  category: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateTransaction),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const transaction = await db.transaction.update({ where: { id }, data });
    return transaction;
  }
);
