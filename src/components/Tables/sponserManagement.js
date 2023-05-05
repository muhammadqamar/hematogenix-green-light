import { HemaValue } from "../../utils";
export const SponserManagementColumns = [
  {
    name: <HemaValue text={"Sponsor Name"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.name} />,
    sortId:'name'
  },
  {
    name: <HemaValue text={"Sponsor Abbreviation"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.abbreviation} />,
    sortId:'abbreviation'
  },
  {
    name: <HemaValue text={"Active"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.isActive ? "Yes" : "No"} />,
    sortId:'isActive'
  },
];
