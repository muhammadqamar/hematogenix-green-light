import React from 'react';

import { HemaValue } from '../../utils';

export const KitConf = [
  {
    name: <HemaValue text={'Name'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.name || 'name'} />,
  },
  {
    name: <HemaValue text={'Testing Lab'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.name || 'lab'} />,
  },
  {
    name: <HemaValue text={'Outbound Condition'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.availableToBuild || 'Condition'} />,
  },
  {
    name: <HemaValue text={'Inbound Condition(s)'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.availableToBuild || 'collapsed'} />,
  },
  {
    name: <HemaValue text={'Actions'} className="font-normal text-[#000000]" />,
    sortable: true,
    selector: (row) => <HemaValue text={row.availableToBuild || 'action'} />,
  },
];
