import { FileIcon, LabelQuantity, DaysCalender, Bell,ChangeReason } from "../../../HemeIconLibrary";

export const editExpiryAlertForm = [
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
    label: "qty",
    initialValue: "",
    name: "Quantity",
    fluid: true,
    type: "table",
  },

  {
    name: "closeToExpiryNumberOfDays",
    label: "Number of days",
    Icon: <DaysCalender />,
    type: "number",
    fluid: true,
    initialValue: "",
    placeholder: "Enter number of days",
    required: true,
  },
  {
    label: "Close to Expiry Alert",
    Icon: <Bell />,
    type: "switch",
    initialValue: false,
    placeholder: "",
    fluid: true,
    name: "closeToExpiryAlert",
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
