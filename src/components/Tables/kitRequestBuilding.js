import { HemaValue } from '../../utils';
export const KitRequestBuilding = [
  {
    name: <HemaValue text={' Name'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.item?.name} />,
    sortId: 'item.name',
  },
  {
    name: <HemaValue text={'Remaining Quantity'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.remainingQuantity || 0} />,
    sortId: 'remainingQuantity',
  },
  {
    name: <HemaValue text={'Built Quantity'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.builtQuantity || 0} />,
    sortId: 'builtQuantity',
  },
  {
    name: <HemaValue text={'Ready to Ship Quantity'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.readyToShipQuantity || 0} />,
    sortId: 'readToShipQuantity',
  },
];
