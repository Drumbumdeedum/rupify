import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getIncome from "app/incomes/queries/getIncome";
import deleteIncome from "app/incomes/mutations/deleteIncome";

export const Income = () => {
  const router = useRouter();
  const incomeId = useParam("incomeId", "number");
  const [deleteIncomeMutation] = useMutation(deleteIncome);
  const [income] = useQuery(getIncome, { id: incomeId });

  return (
    <>
      <Head>
        <title>Income {income.id}</title>
      </Head>

      <div>
        <h1>Income {income.id}</h1>
        <pre>{JSON.stringify(income, null, 2)}</pre>

        <Link href={Routes.EditIncomePage({ incomeId: income.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteIncomeMutation({ id: income.id });
              await router.push(Routes.IncomesPage());
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

const ShowIncomePage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.IncomesPage()}>
          <a>Incomes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Income />
      </Suspense>
    </div>
  );
};

ShowIncomePage.authenticate = true;
ShowIncomePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowIncomePage;
