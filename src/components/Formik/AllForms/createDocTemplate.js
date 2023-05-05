import { LabelUnitType, LabelName } from '../../../HemeIconLibrary';

export const addDocTemplate = [
  {
    label: 'Document Template Name',
    Icon: <LabelName />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter Name',
    required: true,
    name: 'name',
    fluid: true,
  },

  {
    label: 'Document Template Type',
    Icon: <LabelUnitType />,
    type: 'select',
    initialValue: '',
    placeholder: 'Select',
    required: true,
    name: 'templateTypeId',
    fluid: true,
    options: [],
  },
];
