import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getTransaction from "app/transactions/queries/getTransaction";
import updateTransaction from "app/transactions/mutations/updateTransaction";
import {
  TransactionForm,
  FORM_ERROR,
} from "app/transactions/components/TransactionForm";

export const EditTransaction = () => {
  const router = useRouter();
  const transactionId = useParam("transactionId", "number");
  const [transaction, { setQueryData }] = useQuery(
    getTransaction,
    { id: transactionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateTransactionMutation] = useMutation(updateTransaction);

  return (
    <>
      <Head>
        <title>Edit Transaction {transaction.id}</title>
      </Head>

      <div>
        <h1>Edit Transaction</h1>
        <TransactionForm
          submitText="Update Transaction"
          initialValues={transaction}
          onSubmit={async (values) => {
            try {
              const updated = await updateTransactionMutation({
                id: transaction.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.TransactionsPage()
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

const EditTransactionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTransaction />
      </Suspense>

      <p>
        <Link href={Routes.TransactionsPage()}>
          <a>Transactions</a>
        </Link>
      </p>
    </div>
  );
};

EditTransactionPage.authenticate = true;
EditTransactionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditTransactionPage;
