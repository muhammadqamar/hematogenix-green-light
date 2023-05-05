import { HemaValue } from '../../utils';

const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.name.toLowerCase();
    const b = rowB.name.toLowerCase();

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

const availableNumberSort = (rowA, rowB) => {
    const a = rowA.availableToBuild;
    const b = rowB.availableToBuild;

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

const sortQuantitySum = (rowA, rowB) =>{
    const itemOneQtySum = rowA.items.reduce(
        (accumulator, currentValue) => accumulator + currentValue.itemPerKit,
        0,
      );
      const itemTwoQtySum = rowB.items.reduce(
        (accumulator, currentValue) => accumulator + currentValue.itemPerKit,
        0,
      );

      if (itemOneQtySum > itemTwoQtySum) {
        return 1;
    }

    if (itemTwoQtySum > itemOneQtySum) {
        return -1;
    }

    return 0;
}

export const KitTemplateColumn = [
  {
    name: (
      <HemaValue
        text={'Kit Template Name'}
        className="font-normal text-[#000000]"
      />
    ),
    sortable: true,
    selector: (row) => <HemaValue text={row.name} />,
        sortFunction: caseInsensitiveSort,
    sortId: 'name',
  },
  {
    name: (
      <HemaValue
        text={'Quantity Per Kit'}
        className="font-normal text-[#000000]"
      />
    ),
    sortable: true,
        sortFunction: sortQuantitySum
  },
  {
    name: (
      <HemaValue
        text={'Available to Build'}
        className="font-normal text-[#000000]"
      />
    ),
    sortable: true,
    selector: (row) => <HemaValue text={row.availableToBuild} />,
        sortFunction: availableNumberSort,
    sortId: 'availableToBuild',
  },
];
