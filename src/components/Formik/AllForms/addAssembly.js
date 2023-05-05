import { Format, LabelName, LabelCategory, LabelUnitType } from '../../../HemeIconLibrary';

export const addAssembly = [
  {
    label: 'Assembly Name',
    Icon: <LabelName />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter Name',
    required: true,
    name: 'name',
  },
  {
    label: 'Assembly Type',
    Icon: <LabelUnitType />,
    type: 'select',
    initialValue: '',
    placeholder: 'Select',
    required: true,
    name: 'assemblyTypeId',
    options: [],
  },
  {
    label: 'Testing Lab',
    Icon: <LabelCategory />,
    type: 'select',
    initialValue: '',
    placeholder: 'Select',
    required: false,
    name: 'testingLabId',
    options: [],
  },
  {
    label: 'Inbound Condition',
    Icon: <Format />,
    type: 'select',
    initialValue: '',
    placeholder: 'Select',
    required: false,
    name: 'inboundShippingConditionId',
    options: [],
  },
];
