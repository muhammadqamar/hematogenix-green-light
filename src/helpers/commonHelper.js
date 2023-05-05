import { Fridge } from "../HemeIconLibrary/storageIcons/fridge";
import { Rack } from "../HemeIconLibrary/storageIcons/rack";
import { Shelve } from "../HemeIconLibrary/storageIcons/shelve";
import { Freezer } from "../HemeIconLibrary/storageIcons/freezer";
import { Room } from "../HemeIconLibrary/storageIcons/room";
import { Desk } from "../HemeIconLibrary/storageIcons/desk";
import { Almirah } from "../HemeIconLibrary/storageIcons/almirah";
import { Locker } from "../HemeIconLibrary/storageIcons/locker";
import { Home } from "../HemeIconLibrary/home";

export const markItemInTree = (ob, key, value, source = null) => {
    const keyExists = (obj) => {
        if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
            return { found: false, data: obj };
        } else if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (obj[i][`${key}`] === value) {
                    if (obj[i].expand === true && source === 'sidebar') {
                        obj[i].expand = false;
                    } else {
                        obj[i].expand = true;
                    };
                    return { found: true, data: obj };
                }
                const result = keyExists(obj[i].children);
                if (result.found) {
                    return { found: result.found, data: obj };
                }
            }
        }
        return { found: false, data: obj };
    };

    return keyExists(ob);
}

export const addPropertyToTree = (locationTree, newProperty, newValue) => {
    const tree = structuredClone(locationTree);
    const addProperty = (obj) => {
        if (obj.length === 0) {
            return;
        }
        for (let i = 0; i < obj.length; i++) {
            obj[i][`${newProperty}`] = newValue;
            addProperty(obj[i].children, newProperty, newValue)
        }
    }
    addProperty(tree);
    return tree;
}

export const createOptions = (data) => {
    let options = [];
    if (data.options) {
        options = data.options.trim();
        if (options.length) {
            options = options.split(',');
            options = options.map(ele => {
                ele.trim()
                return {
                    name: ele,
                    value: ele
                }
            });
            return options;
        } else {
            return [];
        }
    }
    return options;
}

export const getIcon = (iconName) => {
    const icons = {
        "shelve": <Shelve />,
        "rack": <Rack />,
        "fridge": <Fridge />,
        "freezer": <Freezer />,
        "room": <Room />,
        "desk": <Desk />,
        "locker": <Locker />,
        "almirah": <Almirah />,
    }

    if (iconName && iconName.length) {
        return icons[iconName];
    }

}

export const flattternTree = (members) => {
    let children = [];
    const flattenMembers = members.map(m => {
        if (m.children && m.children.length) {
            children = [...children, ...m.children];
        }
        return m;
    });

    return flattenMembers.concat(children.length ? flattternTree(children) : children);
};

export const findPath = (ob, key, value) => {
    const path = [];
    const keyExists = (obj) => {
        if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
            return { found: false, data: obj };
        } else if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (obj[i][`${key}`] === value) {
                    path.push({ name: obj[i][`${key}`], id: obj[i][`id`] });
                    return { found: true, data: obj };
                }
                const result = keyExists(obj[i].children);
                if (result.found) {
                    path.push({ name: obj[i][`${key}`], id: obj[i][`id`] })
                    return { found: result.found, data: obj };
                }
            }
        }
        return { found: false, data: obj };
    };
    keyExists(ob);
    return path.reverse();
}