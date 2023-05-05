import { FirstName, Email } from '../../../HemeIconLibrary';

export const RequestAcknowledgment = [
  {
    label: 'To',
    Icon: <FirstName />,
    type: 'email',
    initialValue: '',
    placeholder: 'Type email',
    required: true,
    fluid: true,
    name: 'to',
  },
  {
    label: 'Cc',
    Icon: <FirstName />,
    type: 'multiSelecttags',
    initialValue: '',
    placeholder: 'Enter email address',

    fluid: false,
    name: 'cc',
  },
  {
    label: 'Bcc',
    Icon: <FirstName />,
    type: 'multiSelecttags',
    initialValue: '',
    placeholder: 'Enter email address',

    fluid: false,
    name: 'bcc',
  },
  {
    label: 'Subject',
    Icon: <FirstName />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter Subject',
    required: true,
    fluid: true,
    name: 'subject',
  },
  {
    label: 'Email Body',
    Icon: <Email />,
    type: 'textarea',
    initialValue: '',
    placeholder: 'email body',
    required: true,
    fluid: true,
    name: 'body',
  },
];
