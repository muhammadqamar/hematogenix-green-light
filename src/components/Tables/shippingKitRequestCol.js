import { HemaValue } from '../../utils';

export const KitShippingReqCol = [
  {
    name: <HemaValue text={' Shipment'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.name} />,
    sortId: 'Shipment',
  },
  {
    name: <HemaValue text={'Status'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.status?.name} />,
    sortId: 'Status',
  },
  {
    name: <HemaValue text={'Stage'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.stage?.name} />,
    sortId: 'Stage',
  },
  {
    name: <HemaValue text={'Tracking Number'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.trackingNumber} />,
    sortId: 'readToShipQuantity',
  },
  {
    name: <HemaValue text={'Packages'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.numberOfPackages} />,
    sortId: 'readToShipQuantity',
  },
];
