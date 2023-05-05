import { HemaValue } from "../../utils";
export const SiteManagementColumns = [
  {
    name: <HemaValue text={"Sponsor Name"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.sponsor?.name} />,
    sortId:"sponsor.name"
  },
  {
    name: <HemaValue text={"Study Code"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.study?.name} />,
    sortId:"study.name"
  },
  {
    name: <HemaValue text={"Site Name"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.name} />,
    sortId:"name"
  },
  {
    name: <HemaValue text={"Site Code"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.siteCode} />,
    sortId:"siteCode"
  },
  {
    name: <HemaValue text={"Principal Investigator"} className="font-normal text-[#000000]" />,
    sortable: false,
    selector: (row) => (
      <HemaValue
        text={`${row.principalInvestigator?.firstName} ${row.principalInvestigator?.lastName}`}
      />
    ),

  },
  {
    name: <HemaValue text={"Country"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.principalInvestigator?.address?.country?.name} />,
    sortId:"principalInvestigator.address.country.name"
  },
  {
    name: <HemaValue text={"Active"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.isActive ? "Yes" : "No"} />,
    sortId:"isActive"

  }
];
