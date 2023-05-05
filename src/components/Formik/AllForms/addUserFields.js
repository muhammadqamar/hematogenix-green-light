import {
  ChangeReason,
  Email,
  UserOrange,
  TickOrange,
  Role,
} from '../../../HemeIconLibrary';

export const createUserField = [
  {
    label: 'First Name',
    Icon: <UserOrange />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter first name',
    required: true,
    name: 'firstName',
  },
  {
    label: 'Last Name',
    Icon: <UserOrange />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter last name',
    required: true,
    name: 'lastName',
  },
  {
    label: 'Email',
    Icon: <Email />,
    type: 'email',
    initialValue: '',
    placeholder: 'Enter Email',
    required: true,
    name: 'email',
  },
  {
    name: 'roleId',
    label: 'Role',
    Icon: <Role />,
    type: 'select',
    required: true,
    initialValue: '',
    placeholder: 'Select Role',
    options: [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' },
    ],
  },
  {
    name: 'isActive',
    label: 'Active',
    Icon: <TickOrange />,
    type: 'switch',
    fluid: true,
    initialValue: '',
    required: false,
  },
  {
    name: 'changeReason',
    label: 'Change Reason',
    Icon: <ChangeReason />,
    type: 'textarea',
    fluid: true,
    initialValue: '',
    required: true,
    placeholder: 'Type reason',
  },
];

export const bulkFileImport = [
  {
    label: 'Please download and use the template to bulk upload users.',
    type: 'download-bulk',
    downloadType: null,
    fluid: true,
    onClick: () => {},
    buttonText: 'Download Sample Template',
  },
  {
    name: 'userFile',
    // label: 'Upload Excel',
    // Icon: <Upload />,
    type: 'upload-image',
    initialValue: undefined,
    placeholder: 'Excel',
    fluid: true,
    accept:
      '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  },
];
