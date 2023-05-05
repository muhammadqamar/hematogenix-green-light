import React, { useState } from "react";
import Switch from "react-switch";
import { useDispatch } from "react-redux";

import { setThresholdReducer } from "../../Store/reducers/common";

const FormSwitch = (props) => {
    const  {setFieldValue, name, initialValue} = props
    const [checked, setChecked] = useState(initialValue)
    const dispatch= useDispatch()
    return (
        <Switch  onColor="#3D88E0"   onChange={(e) => {
            setFieldValue(name,e)
            setChecked(e)
            dispatch(setThresholdReducer(e))
        }} checked={checked} />

    );

}
export default FormSwitch;