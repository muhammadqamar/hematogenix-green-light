import FormCheckbox from '../../utils/FormElements/checkbox';
import { formats } from '../../utils/DummyData/formats';
import { Add } from '../../HemeIconLibrary';
import { Button } from '../../utils';

export const ItemCategoryColumns = [
  {
    name: 'Field',
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: 'Format',
    sortable: true,
    selector: (row) => {
      if (row.id) {
        if (row.format && row.format.id) {
          return row.format.name;
        }
        return 'Not Specified';
      }
      return '';
    },
  },
  {
    name: 'Options',
    sortable: true,
    selector: (row) => {
      if (row.options) {
        row.options.sort((a, b) => a.sequence - b.sequence);
        return row.options.map((e) => e.name).join(', ');
      }
      return '';
    },
  },
  {
    name: 'Required',
    sortable: true,
    cell: (row) => {
      if (row.isReadOnly !== undefined && row.isRequired !== undefined) {
        return (
          <FormCheckbox
            type="checkbox"
            name={row.name}
            disabled={row.isReadOnly}
            checked={row.isRequired}
            onChange={(e) => {
              console.log('On Change.....', e);
            }}
          ></FormCheckbox>
        );
      }
      return '';
    },
  },
];
