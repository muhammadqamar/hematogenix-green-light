import { ActionDots, AddInventory, Caret, CaretDown, Delete, DeleteInventory, Edit, Pencil } from "../../HemeIconLibrary";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getIcon } from "../../helpers/commonHelper";
import TextWithIcon from "../../pages/storage/components/textWithIcon";


function Explorer({ explorer, onItemClick, showOptions, selectedLocation, editCTA, deleteCTA }) {
    const showChildren = explorer.children ? true : false;
    function expandFolder(explorer) {
        onItemClick(explorer);
    }


    const editCTAHandler = (location) => {
        if (editCTA) {
            editCTA(location)
        }
    }

    const deleteCTAHandler = (location) => {
        if (deleteCTA) {
            deleteCTA(location)
        }
    }



    return (
        <>
            <div className={`input-group flex-nowrap explorer`}>
                <div className={`input-group-text flex-shrink-0 border-0${selectedLocation?.id === explorer.id ? ' selected-item-icon-bg' : ''} location-icon`} id="btnGroupAddon">{!explorer.parentId ? <img
                    width={20}
                    height={20}
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${explorer.iconName}.svg`}
                  />: getIcon(explorer.iconName)}</div>
                <div className={`input-group-bx w-100 p-2${selectedLocation?.id === explorer.id ? ' selected-item-bg' : ''}`}>
                    <span className="d-inline-block btn float-left leading-[18px] font-medium text-[black]" onClick={() => expandFolder(explorer)}>
                        {explorer.expand ? <CaretDown color={selectedLocation?.id === explorer.id ? 'white' : 'black'} /> : <Caret />}
                    </span>
                    <span className="d-inline-block leading-[18px] font-medium cursor-pointer" onClick={() => expandFolder(explorer)}>{explorer.name}</span>
                    {showOptions && explorer.parentId !== null &&
                        <NavDropdown className="h-10 dropdown position-absolute" title={<ActionDots />}>
                            <NavDropdown.Item className="dropdown-item" onClick={() => editCTAHandler(explorer)}>
                                <TextWithIcon text="Edit" icon={<Pencil />} />
                            </NavDropdown.Item>
                            <NavDropdown.Item className="dropdown-item" onClick={() => deleteCTAHandler(explorer)}>
                                <TextWithIcon text="Delete" icon={<Delete />} />
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
                </div>
            </div>
            {showChildren && explorer.expand && explorer.children &&
                <ul className={`m-0 list-unstyled child-list ${explorer.children.length > 1 ? 'multi-child' : ''}`}>
                    {explorer.children.map((explore, index) => (
                        explore.id && <li className={`mt-2 ${explore.expand && explore.children.length ? 'open' : ''} ${index > 0 && index < explorer.children.length - 1 ? 'multi-child-open' : ''} `} key={explore.id}>
                            <Explorer explorer={explore} onItemClick={onItemClick} showOptions={showOptions} selectedLocation={selectedLocation} editCTA={editCTA} deleteCTA={deleteCTA} />
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}

export default Explorer;