import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import createTransaction from "app/transactions/mutations/createTransaction"
import { CreateTransaction } from "app/transactions/validations"
import { useMutation } from "@blitzjs/rpc"

type CreateTransactionFormProps = {
  onSuccess?: () => void
}

export const CreateTransactionForm = (props: CreateTransactionFormProps) => {
  const [createTransactionMutation] = useMutation(createTransaction)
  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Transaction"
        schema={CreateTransaction}
        initialValues={{ name: "" }}
        onSubmit={async (values) => {
          try {
            await createTransactionMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="name" label="name" placeholder="NAME" />
        <LabeledTextField name="amount" label="amount" placeholder="AMOUNT" type="number"/>
      </Form>
    </div>
  )
}

export default CreateTransactionForm
