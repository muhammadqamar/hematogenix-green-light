import { HemaValue, HemaLabel } from "../../utils";

export const InventoryItemColumns = [
  {
    cell: (row) => {
      return (
        <div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Unit Type" showCaret />
            <HemaValue text={row?.unitType?.name || "--"} color="textColor" />
          </div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Unit Size" showCaret />
            <HemaValue text={row?.unitSize || "--"} color="textColor" />
          </div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Last used" showCaret />
            <HemaValue text={row?.used || "--"} color="textColor" />
          </div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Low Inventory Threshold" showCaret />
            <HemaValue text={row?.lowInventoryThreshold || "--"} color="textColor" />
          </div>
        </div>
      );
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    // sortable: true,
    // selector: (row) => row?.unitSize,
    sortable: true,
    sortFunction: (a, b) => a.unitSize - b.unitSize,
  },

  {
    cell: (row) => {
      return (
        <div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Ready" showCaret />
            <HemaValue text={row?.ready || "--"} color="textColor" />
          </div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Expiring" showCaret />
            <HemaValue bg="bg-[#E4DFF7]" color="text-[#775FD5]" text={row?.expiring || "--"} />
          </div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Expired" showCaret />
            <HemaValue text={row?.expired || "--"} bg="bg-[#FDDAE8]" color="text-[#F5488F]" />
          </div>
          <div className="flex items-center gap-[5px] meta mb-[12px]">
            <HemaLabel text="Used" showCaret />
            <HemaValue text={row?.used || "--"} bg="bg-[#DFF6EB]" color="text-[#5DD099]" />
          </div>
        </div>
      );
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
