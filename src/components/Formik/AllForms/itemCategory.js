import { NameKit, Format,Required ,Option} from '../../../HemeIconLibrary';


export const createItemCategory = [
  {
    name: 'name',
    label: 'Item Category Name',
    Icon: <NameKit />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter Category Name',
    required: true,
  },
];

export const createCustomFields = [
  {
    name: 'name',
    label: 'Field Name',
    Icon: <NameKit />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter Field Name',
    required: true,

  },
  {
    name: 'formatId',
    label: 'Format',
    Icon: <Format />,
    type: 'select',
    required: true,
    initialValue: '',
    placeholder: 'Select Field Type',
    options: [],
  },
  {
    name: 'options',
    label: 'Options',
    Icon: <Option />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter Options',
    required: false,
    fluid:true,
    disabled:true
  },
  {
    name: 'isRequired',
    label: 'Required',
    Icon: <Required />,
    type: 'switch',
    initialValue: false,
  },
];
