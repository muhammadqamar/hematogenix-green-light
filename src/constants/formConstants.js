import { Almirah } from "../HemeIconLibrary/storageIcons/almirah";
import { Freezer } from "../HemeIconLibrary/storageIcons/freezer";
import { Fridge } from "../HemeIconLibrary/storageIcons/fridge";
import { Rack } from "../HemeIconLibrary/storageIcons/rack";
import { Shelve } from "../HemeIconLibrary/storageIcons/shelve";
import { Room } from "../HemeIconLibrary/storageIcons/room";
import { Locker } from "../HemeIconLibrary/storageIcons/locker";
import { Desk } from "../HemeIconLibrary/storageIcons/desk";
import { StorageGradient } from "../HemeIconLibrary";


export const icons = [
    {
        "name": "Shelve",
        "icon": <Shelve />,
        "id": "shelve"
    },
    {
        "name": "Rack",
        "icon": <Rack />,
        "id": "rack"
    },
    {
        "name": "Fridge",
        "icon": <Fridge />,
        "id": "fridge"
    },
    {
        "name": "Freezer",
        "icon": <Freezer />,
        "id": "freezer"
    },
    {
        "name": "Room",
        "icon": <Room />,
        "id": "room"
    },
    {
        "name": "Desk",
        "icon": <Desk />,
        "id": "desk"
    },
    {
        "name": "Locker",
        "icon": <Locker />,
        "id": "locker"
    },
    {
        "name": "Almirah",
        "icon": <Almirah />,
        "id": "almirah"
    }
]

export const defaultFields = [
    {
        "sequence": 1,
        "name": "Item Name",
        "versionId": 0,
        "placeholder": "Item Name",
        "isVisible": true,
        "isRequired": true,
        "isReadOnly": true,
        "width": 0,
        "containerCss": "",
        "inputCss": "",
        "mergeFieldKey": "",
        "isStandard": true,
        "formatId": 6,
        "value": "",
        "options": []
    },
    {
        "sequence": 2,
        "name": "Quantity",
        "versionId": 0,
        "placeholder": "string",
        "isVisible": true,
        "isRequired": true,
        "isReadOnly": true,
        "width": 0,
        "containerCss": "string",
        "inputCss": "string",
        "mergeFieldKey": "string",
        "isStandard": true,
        "formatId": 1,
        "value": "string",
        "options": []
    },
    {
        "sequence": 3,
        "name": "Storage Location",
        "versionId": 0,
        "placeholder": "string",
        "isVisible": true,
        "isRequired": true,
        "isReadOnly": true,
        "width": 0,
        "containerCss": "string",
        "inputCss": "string",
        "mergeFieldKey": "string",
        "isStandard": true,
        "formatId": 10,
        "value": "string",
        "options": []
    },
    {
        "sequence": 4,
        "name": "Lot Number",
        "versionId": 0,
        "placeholder": "string",
        "isVisible": true,
        "isRequired": false,
        "isReadOnly": false,
        "width": 0,
        "containerCss": "string",
        "inputCss": "string",
        "mergeFieldKey": "string",
        "isStandard": true,
        "formatId": 6,
        "value": "string",
        "options": []
    },
    {
        "sequence": 5,
        "name": "Expiration Date",
        "versionId": 0,
        "placeholder": "string",
        "isVisible": true,
        "isRequired": false,
        "isReadOnly": false,
        "width": 0,
        "containerCss": "string",
        "inputCss": "string",
        "mergeFieldKey": "string",
        "isStandard": true,
        "formatId": 4,
        "value": "string",
        "options": []
    },
    {
        "sequence": 6,
        "name": "Serial Number",
        "versionId": 0,
        "placeholder": "string",
        "isVisible": true,
        "isRequired": false,
        "isReadOnly": false,
        "width": 0,
        "containerCss": "string",
        "inputCss": "string",
        "mergeFieldKey": "string",
        "isStandard": true,
        "formatId": 6,
        "value": "string",
        "options": []
    },
    {
        "sequence": 7,
        "name": "Barcode",
        "versionId": 0,
        "placeholder": "string",
        "isVisible": true,
        "isRequired": false,
        "isReadOnly": false,
        "width": 0,
        "containerCss": "string",
        "inputCss": "string",
        "mergeFieldKey": "string",
        "isStandard": true,
        "formatId": 6,
        "value": "string",
        "options": []
    }
]

export const fieldDefaultValues = {
    "sequence": 0,
    "name": "",
    "versionId": 0,
    "placeholder": "",
    "isVisible": true,
    "isRequired": false,
    "isReadOnly": false,
    "width": 0,
    "containerCss": "",
    "inputCss": "",
    "mergeFieldKey": "",
    "isStandard": false,
    "formatId": 0,
    "value": "",
    "options": []
}


export const textConstants = {
    deleteWithMoveSubheading: 'You have chosen to delete this storage location. If you delete it, any items that are assigned to this storage location or any of its dependent locations will be moved to a new storage location. Choose a storage location to move affected items.',
    chooseNewLocationText: 'Please Choose a new location.'

}

export const dataConstatnt = {
    defaultLocationModalProps: {
        title: 'Select Location',
        subTitle: null,
        icon: <StorageGradient />
    }
}