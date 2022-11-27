import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateExpense = z.object({
  name: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
  category: z.string().nullish(),
});

export default resolver.pipe(
  resolver.zod(CreateExpense),
  resolver.authorize(),
  async (input, ctx) => {
    const expense = await db.expense.create({ 
      data: {
        name: input.name,
        amount: input.amount,
        note: input.note,
        category: input.category ? input.category : "GROCERIES",
        user: { 
          connect: { id: ctx.session.userId } 
        },
      } 
    });
    return expense;
  }
);
