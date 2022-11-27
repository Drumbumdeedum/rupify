import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "app/core/layouts/Layout";
import getIncome from "app/incomes/queries/getIncome";
import updateIncome from "app/incomes/mutations/updateIncome";
import { IncomeForm, FORM_ERROR } from "app/incomes/components/IncomeForm";

export const EditIncome = () => {
  const router = useRouter();
  const incomeId = useParam("incomeId", "number");
  const [income, { setQueryData }] = useQuery(
    getIncome,
    { id: incomeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateIncomeMutation] = useMutation(updateIncome);

  return (
    <>
      <Head>
        <title>Edit Income {income.id}</title>
      </Head>

      <div>
        <h1>Edit Income {income.id}</h1>
        <pre>{JSON.stringify(income, null, 2)}</pre>

        <IncomeForm
          submitText="Update Income"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIncome}
          initialValues={income}
          onSubmit={async (values) => {
            try {
              const updated = await updateIncomeMutation({
                id: income.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowIncomePage({ incomeId: updated.id })
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

const EditIncomePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditIncome />
      </Suspense>

      <p>
        <Link href={Routes.IncomesPage()}>
          <a>Incomes</a>
        </Link>
      </p>
    </div>
  );
};

EditIncomePage.authenticate = true;
EditIncomePage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditIncomePage;
