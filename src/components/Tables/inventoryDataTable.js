
import { HemaValue } from "../../utils";

const sortingData = (rowA, rowB,type,option1,option2=null) => {
    var a;
    var b;
    if(type === "string"){
        if(option2 != null){
            a = rowA[`${option1}`][`${option2}`].toLowerCase();
            b = rowB[`${option1}`][`${option2}`].toLowerCase();
        }else{
            a = rowA[`${option1}`].toLowerCase();
            b = rowB[`${option1}`].toLowerCase();
        }
        
    }else{
        if(option2 != null){
            a = rowA[`${option1}`][`${option2}`];
            b = rowB[`${option1}`][`${option2}`];
        }
        a = rowA[`${option1}`];
        b = rowB[`${option1}`];
    }   

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

export const InventoryColumns = [
    {
        name: <HemaValue text={'Item Name'} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row.item?.name} />,
        sortFunction: (rowA,rowB) =>  sortingData(rowA,rowB,"string","item","name"),
        sortId:"item.name"
    },
    {
        name: <HemaValue text={"Location"} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row.location?.name} />,
        sortFunction: (rowA,rowB) => sortingData(rowA,rowB,"string","location","name"),
        sortId:"location.name"
    },
    {
        name: <HemaValue text={"Lot Number"} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row.lotNumber} />,
        sortFunction: (rowA,rowB) => sortingData(rowA,rowB,"number","lotNumber"),
        sortId:"lotNumber"
    },
    {
        name: <HemaValue text={'Expiration Date'} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row.expirationDate} />,
        sortFunction: (rowA,rowB) => sortingData(rowA,rowB,"number","expirationDate"),
        sortId:"expirationDate"
    },
    {
        name:<HemaValue text={'Quantity'} className="font-normal text-[#000000]" />,
        sortable: true,
        selector: (row) => <HemaValue text={row.quantity} />,
        sortFunction: (rowA,rowB) => sortingData(rowA,rowB,"number","quantity"),
        sortId:"quantity"
    },
]
