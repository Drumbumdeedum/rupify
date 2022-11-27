import { useRedirectAuthenticated } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (userId: number) => {
  const aggregateExpenses = await db.expense.groupBy({
    where: {
      userId: userId,
    },
    by: ["category"],
    _sum: {
      amount: true,
    },
  })
  return aggregateExpenses
})
