import { LabelQuantity } from "../../../HemeIconLibrary";

export const inventoryKitBuilder = [
  {
    label: "Template Name",
    initialValue: "",
    name: "name",
    fluid: true,
    type: "table",
  },
  {
    name: "qty",
    label: "Quantity",
    Icon: <LabelQuantity />,
    type: "number",
    initialValue: "",
    placeholder: "Enter quantity",
    required: true,
    showTotal: true,
    min: 1,
    step: 1,
  },
];
