import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { LabeledSelectField } from "app/core/components/LabeledSelectField";

import { z } from "zod";
import React from "react";
export { FORM_ERROR } from "app/core/components/Form";

export function TransactionForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const [expenseTypes] = React.useState([
    {value: "EXPENSE_GROCERIES", label: "Groceries"}, 
    {value: "EXPENSE_BILL", label: "Bill"}, 
    {value: "EXPENSE_SUBSCRIBTION", label: "Subscription"}, 
    {value: "EXPENSE_HOSPITALITY", label: "Hospitality"}, 
    {value: "EXPENSE_VEHICLE", label: "Vehicle"}, 
    {value: "EXPENSE_PUBLIC_TRANSPORT", label: "Public Transport"}, 
    {value: "EXPENSE_PET", label: "Pet"}, 
    {value: "EXPENSE_OTHER", label: "Other"}, 
  ]);
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="amount" label="Amount" placeholder="Amount" type="number" />
      <LabeledTextField name="note" label="Note" placeholder="Note" />
      <LabeledSelectField name="category" label="Category">
        {expenseTypes.map((expenseType) => 
          <option value={expenseType.value}>{expenseType.label}</option>
        )}
      </ LabeledSelectField>
    </Form>
  );
}
