import { Location, DaysCalender, ExpiryNotification} from "../../../HemeIconLibrary";


export const ConfirmKitBuilder = [

  {
    label: "Storage Location",
    Icon: <Location />,
    type: "Storage-Locations",
    initialValue: "",
    placeholder: "Browse",
    required: true,
    name: "locationId",
    fluid:true
  },

  {
    label: "Number of days",
    Icon: <DaysCalender />,
    type: "number",
    initialValue: "",
    placeholder: "Enter number of days",
    required: false,
    name: "closeToExpiryNumberOfDays",
    min: "1",
    step: "1",
    fluid:true
  },
  {
    label: "Close to Expiry Alert",
    Icon: <ExpiryNotification />,
    type: "switch",
    initialValue: false,
    placeholder: "",
    name: "closeToExpiryAlert",
    fluid:true
  },
];
