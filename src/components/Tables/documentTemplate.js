import { HemaValue } from '../../utils';
export const DocumentTemplateDataTable = [
  {
    name: <HemaValue text={'Document Template Name'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.name} />,
    sortId:"name"
  },
  {
    name: <HemaValue text={'Document Type Type'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row?.type?.name} />,
    sortId:"type.name"
  },
];
