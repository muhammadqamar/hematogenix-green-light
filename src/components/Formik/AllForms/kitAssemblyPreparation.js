import { LabelQuantity } from '../../../HemeIconLibrary';

export const KitAssemblyPreparation = [
  {
    label: 'Kit Name',
    initialValue: 'Screening Kit',
    name: 'name',
    fluid: true,
    type: 'table',
  },
  {
    name: 'qty',
    label: 'Assembly Name',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
  {
    name: 'ready',
    label: 'Testing Lab',
    // Icon: <LabelQuantity />,
    initialValue: '',
    fluid: true,
    type: 'table',
  },
  {
    name: 'build-qty',
    label: 'Inbound Condition',
    type: 'table',
    initialValue: '',
    fluid: true,
  },
  {
    name: 'build-qty',
    type: 'kitpreparationTable',
    initialValue: '',
    fluid: true,
  },
];
