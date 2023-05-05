const validater = (errors, values) => {
    if (!Number.isInteger(values?.lowInventoryThreshold) && (values?.lowInventoryThreshold !== undefined && values?.lowInventoryThreshold !== "") ) {
        errors.lowInventoryThreshold = 'invalid quantity';
    }
    if (values?.name?.length > 100  ) {
        errors.name = 'max 100 character allowed';
    }
    if (values?.description?.length > 250 ) {
        errors.description = 'max 250 character allowed';
    }
    if (!["png","jpeg","jpg","svg","gif"].includes(values?.fileId?.name?.split(".")[1]) && (values?.fileId !== undefined && values?.lowInventoryThreshold !== "") ) {
        errors.fileId = 'invalid image input type';
    }
    else if (values?.fileId?.size > 2000000  && values?.fileId !== undefined ) {
        errors.fileId = 'image size must be less then 2MB';
    }
    return errors
}

export default validater