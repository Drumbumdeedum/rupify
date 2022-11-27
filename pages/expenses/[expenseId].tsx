import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getExpense from "app/expenses/queries/getExpense";
import deleteExpense from "app/expenses/mutations/deleteExpense";

export const Expense = () => {
  const router = useRouter();
  const expenseId = useParam("expenseId", "number");
  const [deleteExpenseMutation] = useMutation(deleteExpense);
  const [expense] = useQuery(getExpense, { id: expenseId });

  return (
    <>
      <Head>
        <title>Expense {expense.id}</title>
      </Head>

      <div>
        <h1>Expense {expense.id}</h1>
        <pre>{JSON.stringify(expense, null, 2)}</pre>

        <Link href={Routes.EditExpensePage({ expenseId: expense.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteExpenseMutation({ id: expense.id });
              await router.push(Routes.ExpensesPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowExpensePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ExpensesPage()}>
          <a>Expenses</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Expense />
      </Suspense>
    </div>
  );
};

ShowExpensePage.authenticate = true;
ShowExpensePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowExpensePage;
