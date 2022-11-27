import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "app/core/layouts/Layout";
import getTransactions from "app/transactions/queries/getTransactions";
import { useCurrentUser } from "app/users/hooks/useCurrentUser";

const ITEMS_PER_PAGE = 100;

export const TransactionsList = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();


  const page = Number(router.query.page) || 0;
  const [{ transactions, hasMore }] = usePaginatedQuery(getTransactions, {
    where: { userId: currentUser?.id},
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <table>
        <tr>
          <th>NAME</th>
          <th>AMOUNT</th>
          <th>TYPE</th>
          <th>CATEGORY</th>
          <th>CREATED</th>
          <th>NOTE</th>
        </tr>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>
              <div>{transaction.name}</div>
            </td>
            <td>
              <div>{transaction.amount}</div>
            </td>
            <td>
              <div>{transaction.type}</div>
            </td>
            <td>
              <div>{transaction.category}</div>
            </td>
            <td>
              <div>
                {transaction.createdAt.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </td>
            <td>
              <div>{transaction.note}</div>
            </td>
            <td>
            <Link
                href={Routes.EditTransactionPage({
                  transactionId: transaction.id,
                })}
              >
                <a>
                  <div>EDIT</div>
                </a>
              </Link>
            </td>
          </tr>
        ))}
      </table>

      {/* <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button> */}
    </div>
  );
};

const TransactionsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Transactions</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTransactionPage()}>
            <a>Create Transaction</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default TransactionsPage;
