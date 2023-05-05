const negativeQuantityCheck = (errors, values) => {

    if (values?.Quantity <= 0) {
        errors.Quantity = "You can't add quantity with negative values or zero";
    }
    return errors
}

export default negativeQuantityCheck