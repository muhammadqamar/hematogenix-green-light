import { LabelName, ExpiryNotification, NameKit, Icon, TickOrange, ChangeReason } from '../../../HemeIconLibrary';

export const createNewSponser = [
  {
    label: 'Sponsor Name',
    Icon: <NameKit />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter sponsor name',
    required: true,
    name: 'name',
    fluid: true,
  },
  {
    label: 'Sponsor Abbreviation',
    Icon: <Icon />,
    type: 'text',
    initialValue: '',
    placeholder: 'Enter sponsor abbreviation',
    required: true,
    name: 'abbreviation',
    fluid: true,
  },
  {
    name: 'isActive',
    label: 'Active',
    Icon: <TickOrange />,
    type: 'switch',
    initialValue: true,
    placeholder: '',
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
