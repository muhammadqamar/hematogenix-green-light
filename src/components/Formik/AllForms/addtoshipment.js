import { LabelUnitType, LabelName } from '../../../HemeIconLibrary';

export const addtoShipment = [
  {
    type: 'heading-only',
    initialValue: 'Create New Shipment',
    fluid: true,
  },
  {
    label: 'Shipment Name',
    Icon: <LabelName />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter ',
    name: 'name',
    fluid: true,
  },
  {
    type: 'heading-only',
    initialValue: 'Add to Existing Shipment',
    fluid: true,
  },
  {
    label: 'Document Template Type',
    Icon: <LabelUnitType />,
    type: 'select',
    initialValue: '',
    placeholder: 'Select',

    name: 'ids',
    fluid: true,
    options: [],
  },
];
