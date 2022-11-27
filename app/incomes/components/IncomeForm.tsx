import { Form, FormProps } from "app/core/components/Form";
import { LabeledSelectField } from "app/core/components/LabeledSelectField";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import React from "react";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export function IncomeForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  const [incomeTypes] = React.useState([
    {value: "SALARY", label: "Salary"}, 
  ]);
  return (
    <Form<S> {...props}>
    <LabeledTextField name="name" label="Name" placeholder="Name" />
    <LabeledTextField name="amount" label="Amount" placeholder="Amount" type="number" />
    <LabeledTextField name="note" label="Note" placeholder="Note" />
    <LabeledSelectField name="category" label="Category" defaultValue={"SALARY"}>
      {incomeTypes.map((incomeType) => 
        <option value={incomeType.value}>{incomeType.label}</option>
      )}
    </ LabeledSelectField>
  </Form>
  );
}
