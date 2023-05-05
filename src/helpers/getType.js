export const getType = (type) => {
  let typeReturn;
  switch (type) {
    case 'Single line text':
      typeReturn = 'text';
      break;
    case 'Multi line text':
      typeReturn = 'textarea';
      break;
    case 'Numeric':
      typeReturn = 'number';
      break;
    case 'Check box':
      typeReturn = 'switch';
      break;
    case 'Date':
      typeReturn = 'date';
      break;
    case 'Single Select':
      typeReturn = 'select';
      break;
    case 'Date & Time':
      typeReturn = 'datetime-local';
      break;
    case 'Phone':
      typeReturn = 'text';
      break;
    case 'Email':
      typeReturn = 'email';
      break;
    case 'Multiple Select':
      typeReturn = 'select';
      break;
    case 'Time':
      typeReturn = 'time';
      break;
    case 'Text':
      typeReturn = 'text';
      break;

    default:
  }
  console.log(typeReturn, type);
  return typeReturn;
};
