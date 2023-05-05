import { FileIcon, LabelQuantity, Location } from "../../../HemeIconLibrary";

export const useInventory = [
  {
    label: "Item Name",
    initialValue: "",
    name: "name",
    fluid: true,
    type: "table",
  },
  {
    label: "Location",
    initialValue: "",
    name: "location",
    fluid: true,
    type: "table",
  },
  {
    label: "Lot Number",
    initialValue: "",
    name: "lot",
    fluid: true,
    type: "table",
  },
  {
    label: "Expiration Date",
    initialValue: "",
    name: "expire",
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
    showTotal: true
  },
];
