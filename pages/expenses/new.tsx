import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createExpense from "app/expenses/mutations/createExpense";
import { ExpenseForm, FORM_ERROR } from "app/expenses/components/ExpenseForm";

const NewExpensePage = () => {
  const router = useRouter();
  const [createExpenseMutation] = useMutation(createExpense);

  return (
    <Layout title={"Create New Expense"}>
      <h1>Create New Expense</h1>

      <ExpenseForm
        submitText="Create Expense"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateExpense}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const expense = await createExpenseMutation(values);
            await router.push(
              Routes.ShowExpensePage({ expenseId: expense.id })
            );
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.ExpensesPage()}>
          <a>Expenses</a>
        </Link>
      </p>
    </Layout>
  );
};

NewExpensePage.authenticate = true;

export default NewExpensePage;
