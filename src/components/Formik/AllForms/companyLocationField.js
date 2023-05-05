import {
  LabelName,
  LabelCategory,
  ChangeReason,
  FlagIcon,
  Location
} from "../../../HemeIconLibrary";
import { countries } from "country-flag-icons";

let countryOptions = countries.map((item) => {
  const Imageicon = ()=>{
    return (<img
    width={20}
    height={20}
    alt="United States"
    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item}.svg`}
  />)
  }
  return {
    id: item,
    name: item,
    icon: <Imageicon/>
  };
});

export const companyLocationField = [
  {
    label: "Company Location Name",
    Icon: <Location />,
    type: "text",
    initialValue: "",
    placeholder: "Enter storage location name",
    required: true,
    name: "name",
  },
  {
    name: "itemCategoryId",
    label: "Flag Icon",
    Icon: <FlagIcon />,
    type: "select",
    required: true,
    initialValue: "",
    placeholder: "Select flag",
    options: countryOptions,
  },
  {
    name: "changeReason",
    label: "Change Reason",
    Icon: <ChangeReason />,
    type: "textarea",
    fluid: true,
    initialValue: "",
    required: true,
    placeholder:"Type reason"
  },
];
