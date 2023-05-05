import { HemaValue } from "../../utils";
export const StudyManagementColumns = [
  {
    name: <HemaValue text={"Sponsor Name"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.sponsor?.name} />,
    sortId:"sponsor.name"
  },
  {
    name: <HemaValue text={"Study Name"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.name} />,
    sortId:"name"
  },
  {
    name: <HemaValue text={"Study Code"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.studyCode} />,
    sortId:"studyCode"
  },
  {
    name: <HemaValue text={"Study Name Alias"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.nameAlias} />,
    sortId:"nameAlias"
  },
  {
    name: <HemaValue text={"Study Code Alias"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.studyCodeAlias} />,
    sortId:"studyCodeAlias"
  },
  {
    name: <HemaValue text={"Active"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.isActive ? "Yes" : "No"} />,
    sortId:"isActive"
  },
];
