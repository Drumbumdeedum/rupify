import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getIncomes from "app/incomes/queries/getIncomes";

const ITEMS_PER_PAGE = 100;

export const IncomesList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ incomes, hasMore }] = usePaginatedQuery(getIncomes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            <Link href={Routes.ShowIncomePage({ incomeId: income.id })}>
              <a>{income.name}</a>
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

const IncomesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Incomes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewIncomePage()}>
            <a>Create Income</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <IncomesList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default IncomesPage;
