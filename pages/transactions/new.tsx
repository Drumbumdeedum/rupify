import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createTransaction from "app/transactions/mutations/createTransaction";
import {
  TransactionForm,
  FORM_ERROR,
} from "app/transactions/components/TransactionForm";

const NewTransactionPage = () => {
  const router = useRouter();
  const [createTransactionMutation] = useMutation(createTransaction);

  return (
    <Layout title={"Create New Transaction"}>
      <h1>Create New Transaction</h1>

      <TransactionForm
        submitText="Create Transaction"
        onSubmit={async (values) => {
          try {
            const transaction = await createTransactionMutation(values);
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

      <p>
        <Link href={Routes.TransactionsPage()}>
          <a>Transactions</a>
        </Link>
      </p>
    </Layout>
  );
};

NewTransactionPage.authenticate = true;

export default NewTransactionPage;
