import { ItemName} from "../../../HemeIconLibrary";

export const addNewInventoryCheck = [
  {
    label: "Item Name",
    Icon: <ItemName />,
    type: "select",
    initialValue: "",
    placeholder: "Select or create new",
    required: true,
    name: "itemName",
    options:[],
    fluid:true
  },
];
