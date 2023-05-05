import { ChangeReason } from "../../../HemeIconLibrary";
export const deleteInventory = [
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
    type: "table",
    initialValue: "",
    fluid: true,
  },
  {
    name: "change_reason",
    label: "Change Reason",
    Icon: <ChangeReason />,
    type: "textarea",
    initialValue: "",
    fluid: true,
    required: true,
  },
];
