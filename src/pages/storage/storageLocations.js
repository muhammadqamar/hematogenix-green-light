import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useDispatch } from 'react-redux';
import Explorer from '../../components/Explorer/explorer';
import { markItemInTree } from '../../helpers/commonHelper';
import TextContainer from './components/textContainer';
import { setActiveStrutureReduer } from '../../Store/reducers/storageLocation';

const StorageLocationsComponent = ({
  explorer,
  updateSelectedLocation,
  selectedLocation,
  editCTA,
  deleteCTA,
}) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [sidebarItems, updateSidebarItems] = useState(explorer);
  const [breadcrumbItems, setBreadCrumbs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (explorer) {
      updateSidebarItems([...explorer]);
    }
  }, [explorer]);

  function loadNewItems(explorer, source = 'sidebar') {
    // change 'name' to 'id' when IDs will be the unique key, otherwise issues are comming for duplicate name or ID
    const result = markItemInTree(sidebarItems, 'name', explorer.name, source);
    updateSidebarItems([...result.data]);
    setCurrentItems([...explorer.children]);

    updateSelectedLocation({
      name: explorer.name,
      id: explorer.id,
    });

    const itemIndex = breadcrumbItems.findIndex(
      (e) => e.name === explorer.name
    );
    if (explorer.parentId === null) {
      setBreadCrumbs([
        {
          parentId: explorer.parentId,
          name: explorer.name,
        },
      ]);
    } else if (itemIndex === -1) {
      const latestItem = breadcrumbItems[breadcrumbItems.length - 1];
      if (explorer.parentId && latestItem.parentId === explorer.parentId) {
        breadcrumbItems[breadcrumbItems.length - 1].name = explorer.name;
        setBreadCrumbs([...breadcrumbItems]);
      } else {
        const breadCrumbItem = {
          parentId: explorer.parentId,
          name: explorer.name,
        };
        setBreadCrumbs((previousItems) => [...previousItems, breadCrumbItem]);
      }
    } else {
      const newItmes = breadcrumbItems.slice(0, itemIndex + 1);
      setBreadCrumbs([...newItmes]);
    }
    // dispatch(setActiveStrutureReduer(explorer))
  }

  function windowItemClickHandler(location) {
    location.expand = true;
    location.children &&
      location.children.length &&
      loadNewItems(location, 'window');
  }

  function SideExplorer() {
    return (
      <ul className="p-0 m-0 list-unstyled">
        {sidebarItems.map((item) => {
          return (
            <li
              className={`parent-lst mb-2${item.expand ? ' open' : ''}`}
              key={item.id}
            >
              <Explorer
                explorer={item}
                onItemClick={loadNewItems}
                showOptions={true}
                selectedLocation={selectedLocation}
                editCTA={editCTA}
                deleteCTA={deleteCTA}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  function Breadcrumbs() {
    return (
      <div className="pt-2 pb-2 breadcrumb-box ps-3 pe-3">
        <Breadcrumb className="text-[black]">
          {breadcrumbItems.map((item) => (
            <Breadcrumb.Item
              key={`${item.name}_${item.id}`}
              className="text-[12px] leading-[18px] font-medium text-[black]"
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    );
  }

  return (
    <div className="py-[20px] px-[16px] d-flex storage-location-container">
      <div className="flex-shrink-0 border-r location-col border-[#ccc]">
        {SideExplorer()}
      </div>
      <div className="storage-content-container pe-3 ps-3 flex-grow-1">
        {breadcrumbItems.length ? Breadcrumbs() : <></>}
        <div className="storage-content-inner">
          {currentItems.length ? (
            <div className="d-grid">
              {currentItems.map((item) => {
                return (
                  <div
                    key={`${item.name}_${item.id}`}
                    className="pt-2 pb-2 gr-list ps-3 pe-3"
                    onClick={() => {
                      windowItemClickHandler(item);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <TextContainer text="No storage locations to show. Please add by clicking on Add Storage Location or Choose a parent location" />
          )}
        </div>
      </div>
    </div>
  );
};

export default StorageLocationsComponent;
