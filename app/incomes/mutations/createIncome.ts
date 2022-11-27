import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateIncome = z.object({
  name: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
  category: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateIncome),
  resolver.authorize(),
  async (input, ctx) => {
    const income = await db.income.create({ 
      data: {
        name: input.name,
        amount: input.amount,
        note: input.note,
        category: input.category,
        user: { 
          connect: { id: ctx.session.userId } 
        },
      } 
    });
    return income;
  }
);
