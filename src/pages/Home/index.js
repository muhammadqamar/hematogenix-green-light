import React from "react";
import HemaForm from '../../components/Formik'
import { HemaValue, HemaLabel, Button } from "../../utils";
import { FileIcon } from "../../HemeIconLibrary"
import {createNewItem} from '../../components/Formik/AllForms/createNewItem.js'

const Index = () => {
  return <div className="mt-[20px]">
    <HemaLabel
      Icon={<FileIcon />}
      required
      text="Item Name"
      showCaret
      color="black"
    />
    <HemaValue text="Blue Tubes" bg="black" color="red" />
    <Button
      Icon={<FileIcon />}
      text="Add Inventory"
      bg='primary'
      color="black"
    />
    <Button
      Icon={<FileIcon />}
      bg='primary'
      color="black"
    />
    <HemaForm data={createNewItem} cta={(val)=>console.log(val)} />
  </div>;
};

export default Index;
