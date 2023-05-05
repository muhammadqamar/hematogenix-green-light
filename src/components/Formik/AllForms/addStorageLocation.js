import { ChangeReason, Location, Icon, ParentLocation } from "../../../HemeIconLibrary";
import { icons } from "../../../constants/formConstants";
import { Fade } from "react-bootstrap";

export const createLocationStorage = [
    {
        name: "name",
        label: "Storage Location Name",
        Icon: <Location />,
        type: "text",
        initialValue: "",
        placeholder: "Enter Storage Location Name",
        required: true,
        fluid: true,
    },
    // {
    //     name: "isParentLocation",
    //     label: "Make It Parent Location",
    //     Icon: <FileIcon />,
    //     type: "checkbox",
    //     required: false,
    //     initialValue: false,
    // },

    {
        name: "iconName",
        label: "Icon",
        Icon: <Icon />,
        type: "select",
        required: true,
        initialValue: "",
        placeholder: "Select Icon",
        fluid: true,
        options: icons,
    },
    {
        name: "StorageLocation",
        label: "Parent Location",
        Icon: <ParentLocation />,
        type: "Storage-Locations",
        required: true,
        text: "Select Location",
        disabled: false,
        fluid: true,
        data: null,
        width: 'full',
        height: '[36px]',
        placeholder: "Browse",
    },
];

export const changeReason = {
    name: "changeReason",
    label: "Change Reason",
    Icon: <ChangeReason />,
    placeholder: "Type reason",
    type: "textarea",
    initialValue: "",
    fluid: true,
    required: true,

}


export const deleteReason = {
    name: "deleteReason",
    label: "Delete Reason",
    Icon: <ChangeReason />,
    type: "textarea",
    placeholder: "Type reason",
    initialValue: "",
    fluid: true,
    required: true,

}


export const moveLocation = {
    name: "StorageLocation",
    label: "New Storage Location",
    Icon: <Location />,
    type: "Storage-Locations",
    required: true,
    text: "Select Location",
    disabled: false,
    fluid: true,
    data: null,
    width: 'full',
    height: '[36px]',
    initialValue:"",
    placeholder: "Browse",
}