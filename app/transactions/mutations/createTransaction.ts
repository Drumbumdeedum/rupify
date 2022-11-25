import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreateTransaction } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateTransaction), 
  resolver.authorize(), 
  async ({ name, amount }, ctx) => {

  const user = await db.user.findFirst({ where: { id: ctx.session.userId } })
  if (!user) throw new NotFoundError()

  const transaction = await db.transaction.create({
    data: { name: name, amount: amount, userId: user.id},
    select: { id: true, name: true, userId: true },
  })
  return transaction
})
