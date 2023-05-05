
import { HemaValue } from "../../utils";
export const AssemblyDataTable = [
    {
        name: <HemaValue text={'Assembly Name'} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row.name} />,
        sortId:"name"
    },
    {
        name: <HemaValue text={"Testing Lab"} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row?.testingLab?.name} />,
        sortId:"testingLab.name"

    },
    {
        name: <HemaValue text={"Quanity Per Assembly"} className="font-normal text-[#000000]" />,
        sortable: false,
    },

    {
        name: <HemaValue text={"Inboud Conditon"} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row?.inboundShippingCondition?.name} />,
        sortId:"inboundShippingCondition.name"
    },


]
