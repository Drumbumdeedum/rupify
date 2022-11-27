import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getExpense from "app/expenses/queries/getExpense";
import updateExpense from "app/expenses/mutations/updateExpense";
import { ExpenseForm, FORM_ERROR } from "app/expenses/components/ExpenseForm";

export const EditExpense = () => {
  const router = useRouter();
  const expenseId = useParam("expenseId", "number");
  const [expense, { setQueryData }] = useQuery(
    getExpense,
    { id: expenseId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateExpenseMutation] = useMutation(updateExpense);

  return (
    <>
      <Head>
        <title>Edit Expense {expense.id}</title>
      </Head>

      <div>
        <h1>Edit Expense {expense.id}</h1>
        <pre>{JSON.stringify(expense, null, 2)}</pre>

        <ExpenseForm
          submitText="Update Expense"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateExpense}
          initialValues={expense}
          onSubmit={async (values) => {
            try {
              const updated = await updateExpenseMutation({
                id: expense.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowExpensePage({ expenseId: updated.id })
              );
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditExpensePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditExpense />
      </Suspense>

      <p>
        <Link href={Routes.ExpensesPage()}>
          <a>Expenses</a>
        </Link>
      </p>
    </div>
  );
};

EditExpensePage.authenticate = true;
EditExpensePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditExpensePage;
