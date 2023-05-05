import { Language, LabelName } from '../../../HemeIconLibrary';

export const addDocTemplateLang = [
  {
    label: 'Document Templates Name',
    Icon: <LabelName />,
    type: 'text',
    initialValue: '',
    placeholder: 'name',
    required: true,
    disabled: true,
    name: 'documentTemplateId',
    fluid: true,
  },

  {
    label: 'Language',
    Icon: <Language />,
    type: 'select',
    initialValue: '',
    placeholder: 'Select language',
    required: true,
    name: 'versionId',
    fluid: true,
    options: [],
  },
];
