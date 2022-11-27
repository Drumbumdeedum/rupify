import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getExpenses from "app/expenses/queries/getExpenses";

const ITEMS_PER_PAGE = 100;

export const ExpensesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ expenses, hasMore }] = usePaginatedQuery(getExpenses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <Link href={Routes.ShowExpensePage({ expenseId: expense.id })}>
              <a>{expense.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const ExpensesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Expenses</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewExpensePage()}>
            <a>Create Expense</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ExpensesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default ExpensesPage;
