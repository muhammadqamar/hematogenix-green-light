import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';
import { FormCheckbox, FormText, Button, HemaValue } from '../../../utils';
import { Delete, DragDrop } from '../../../HemeIconLibrary';
import { updateFieldInItemCategoryInEdit,setItemCategoriesReducer } from '../../../Store/reducers/storageLocation';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Table from 'react-bootstrap/Table';
export const DataTableRowItems = ({ index, item, setItems, allItems, items, showEditState, dispatch, deleteCustomFieldCTA }) => {
  return (
    <>
      <td>
        {showEditState && !item.isStandard ? (
          <div className="flex items-center">
            <Button type="button" Icon={<DragDrop />} />
            <FormText
              onChange={(e) => {
                dispatch(
                  updateFieldInItemCategoryInEdit({
                    data: item,
                    value: e.target?.value,
                    type: 'is-name',
                  }),
                );
              }}
              value={item.name}
            />
          </div>
        ) : (
          <div className="flex items-center">
            <Draggable draggableId={String(item.id)} index={index} isDragDisabled={!showEditState}>
              {(provided, snapshot) => (
                <div className="flex" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  <Button type="button" className={!showEditState ? 'opacity-[.5]' : 'opacity-[1]'} Icon={<DragDrop />} />
                  {item.name}
                </div>
              )}
            </Draggable>
          </div>
        )}
      </td>
      <td>{item.format?.name}</td>
      <td className="">{item.options?.map((e) => e.name).join(', ')}</td>
      <td className="">
        <FormCheckbox
          type="checkbox"
          name={item.name}
          disabled={showEditState ? ['Item Name', 'Quantity', 'Storage Location', 'Lot Number'].includes(item.name) : true}
          checked={['Item Name', 'Quantity', 'Storage Location', 'Lot Number'].includes(item.name) || item.isRequired}
          onChange={(e) => {
            console.log('On Change.....', e.target);
            dispatch(
              updateFieldInItemCategoryInEdit({
                data: item,
                value: e.target?.checked,
                type: 'is-required',
              }),
            );
          }}
        ></FormCheckbox>
      </td>
      <td className="">
        {item.isStandard === false && !showEditState && (
          <div
            className="mb-1 cursor-pointer"
            href="#action4"
            onClick={() => {
              deleteCustomFieldCTA(item);
            }}
          >
            <Delete />
          </div>
        )}
      </td>
    </>
  );
};

const ItemCategoryField = ({ selectedCategory, showEditState, deleteCustomFieldCTA, dispatch }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (selectedCategory?.fields?.length) {
      setItems(selectedCategory?.fields);
    }
  }, [selectedCategory]);

  useEffect(() => {
    console.log("items",items)
  }, [items]);

  const onDragEnd = (result) => {
    const itemsData = reorder(items, result.source.index, result.destination.index);
    let data = [...itemsData];
    data = data.map((up,index) => {
        return{
          ...up,
          sequence : (index+1)
        }
    });
    setItems(data);
    console.log("data",data)
    dispatch(setItemCategoriesReducer({...selectedCategory, fields:data}));
    if (!result.destination) {
      return;
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  return (
    <div className="w-full">
      <div className="mt-[13px] border-t border-[#ccc] w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Table>
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Format</th>
                      <th>Options</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  {items?.length > 0 && (
                    <tbody>
                      {items?.map((item, index) => (
                        <tr key={item.id}>
                          <DataTableRowItems index={index} item={item} showEditState={showEditState} dispatch={dispatch} deleteCustomFieldCTA={deleteCustomFieldCTA} />
                        </tr>
                        // <Draggable key={item.id} draggableId={String(item.id)} index={index} isDragDisabled={!showEditState}>
                        //   {(provided, snapshot) => (
                        //     <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        //       <DataTableRowItems index={index} item={item} showEditState={showEditState} dispatch={dispatch} deleteCustomFieldCTA={deleteCustomFieldCTA} />
                        //     </tr>
                        //   )}
                        // </Draggable>
                      ))}
                    </tbody>
                  )}
                </Table>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ItemCategoryField;
