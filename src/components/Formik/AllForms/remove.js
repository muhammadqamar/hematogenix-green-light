import { ChangeReason } from '../../../HemeIconLibrary';

export const Remove = [
  {
    label: '',
    initialValue: '',
    name: 'itemTodelete',
    fluid: true,
    type: 'table',
  },
  {
    name: 'change_reason',
    label: 'Change Reason',
    Icon: <ChangeReason />,
    type: 'textarea',
    initialValue: '',
    fluid: true,
    required: true,
    placeholder:"Type reason"
  },
];
