import { HemaValue } from "../../utils";

export const KitPackagingCol = [
  {
    name: <HemaValue text={" Name"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.name} />,
    sortId: "Name",
  },
  {
    name: <HemaValue text={"Items Per Package"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.readToShipQuantity} />,
    sortId: "readToShipQuantity",
  },
  {
    name: <HemaValue text={"Parcel ID"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.readToShipQuantity} />,
    sortId: "readToShipQuantity",
  },
  {
    name: <HemaValue text={"Lot Number"} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.readToShipQuantity} />,
    sortId: "readToShipQuantity",
  },
];
