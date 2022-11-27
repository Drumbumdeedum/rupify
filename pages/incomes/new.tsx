import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createIncome from "app/incomes/mutations/createIncome";
import { IncomeForm, FORM_ERROR } from "app/incomes/components/IncomeForm";

const NewIncomePage = () => {
  const router = useRouter();
  const [createIncomeMutation] = useMutation(createIncome);

  return (
    <Layout title={"Create New Income"}>
      <h1>Create New Income</h1>

      <IncomeForm
        submitText="Create Income"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIncome}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const income = await createIncomeMutation(values);
            await router.push(Routes.ShowIncomePage({ incomeId: income.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.IncomesPage()}>
          <a>Incomes</a>
        </Link>
      </p>
    </Layout>
  );
};

NewIncomePage.authenticate = true;

export default NewIncomePage;
