import { LabelName, ChangeReason, Email, TickOrange , Locked, UserOrange} from '../../../HemeIconLibrary';

const columns = [
  {
    name: 'Sponsor',
    sortable: true,
    cell: (row) => row.name,
  },
  {
    name: 'Study',
    sortable: true,
    cell: (row) => row.study?.name,
  },
  {
    name: 'Site',
    sortable: true,
    cell: (row) => row.siteCode,
  },
];

export const addPortalUserFields = [
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
    fluid: true,
    name: 'email',
  },
  {
    name: 'isActive',
    label: 'Active',
    Icon: <TickOrange />,
    type: 'switch',
    initialValue: true,
    required: false,
  },
  {
    name: 'isLocked',
    label: 'Locked',
    Icon: <Locked />,
    type: 'switch',
    initialValue: false,
    required: false,
  },
  {
    name: 'siteIds',
    label: 'Site Access',
    type: 'formTable',
    fluid: true,
    initialValue: [],
    // columns: columns,
    required: true,
  },

  {
    name: 'changeReason',
    label: 'Change Reason',
    Icon: <ChangeReason />,
    type: 'textarea',
    fluid: true,
    initialValue: '',
    required: true,
  },
];
