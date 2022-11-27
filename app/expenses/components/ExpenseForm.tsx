import { Form, FormProps } from "app/core/components/Form";
import { LabeledSelectField } from "app/core/components/LabeledSelectField";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import React from "react";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export function ExpenseForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const [expenseTypes] = React.useState([
    {value: "GROCERIES", label: "Groceries"}, 
    {value: "BILL", label: "Bill"}, 
    {value: "SUBSCRIBTION", label: "Subscription"}, 
    {value: "HOSPITALITY", label: "Hospitality"}, 
    {value: "VEHICLE", label: "Vehicle"}, 
    {value: "PUBLIC_TRANSPORT", label: "Public Transport"}, 
    {value: "PET", label: "Pet"}, 
    {value: "OTHER", label: "Other"}, 
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
