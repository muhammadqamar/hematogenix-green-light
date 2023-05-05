import { LabelQuantity } from '../../../HemeIconLibrary';

export const ScreeningKitBuild = [
  {
    label: 'Screening Kit',
    initialValue: '',
    name: 'orderItemId',
    fluid: true,
    type: 'table',
  },
  {
    name: 'qty',
    label: 'Number of kits left to assign:',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
  {
    name: 'recordItemId',
    label: '',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'ScreeningKitTable',
  },
  {
    name: 'build_qty',
    label: 'Quantity',
    Icon: <LabelQuantity />,
    type: 'number',
    initialValue: '',
    placeholder: 'Enter quantity',
    required: true,
    showTotal: true,
    min: 1,
    step: 1,
  },
];

export const Unassignkit = [
  {
    label: 'Item Name',
    initialValue: '',
    name: 'item-name',
    fluid: true,
    type: 'table',
  },
  {
    name: 'buildQuantity',
    label: 'Number of items that will be unassigned:',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
  {
    name: 'message',
    label: 'This action will unassign the selected item from this request. Please confirm this action below.',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
];
export const assignLineItem = [
  {
    label: 'Item Name',
    initialValue: '',
    name: 'item-name',
    fluid: true,
    type: 'table',
  },
  {
    name: 'buildQuantity',
    label: 'Number of items left to assign::',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
  {
    name: 'message',
    label: 'Please confirm that you have prepared this line item to be included in this request.',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
];
