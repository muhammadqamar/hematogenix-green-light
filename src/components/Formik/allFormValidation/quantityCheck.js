const validater = (errors, values, store) => {

    if (values?.qty > store.editForm?.availableToBuild) {
        errors.qty = 'Dont have enough quantity available.';
    }
    return errors
}

export default validater