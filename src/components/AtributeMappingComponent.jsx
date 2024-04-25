import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import AttributeRowComponent from "./AttributeRowComponent";
import { useNavigate } from "react-router-dom";
import { addAttributeArray } from "../redux/slices/excelSlice";
import { deleteAttributeArray } from "../redux/slices/excelSlice";
import { useSelector } from "react-redux";

export default function AttributeMapping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //getting attributes list from the current
  const classMapingAttributes = useSelector((state) => state.excelSlice.classDataList).find(
    (item) => item.id === id
  ).selectedAttributes;

  const addRow = () => {
    dispatch(addAttributeArray({ id }));
  };

  const deleteRow = (index) => {
    dispatch(deleteAttributeArray({ id, index }));
  };

  const save = () => {
    navigate(-1);
  };

  // const cancel = () => {
  //   //dispatch(resetAttributeArray({ id }));
  //   navigate(-1);
  // };
  //Disabling save button if any of the dropdowns are not selected
  const classDataList = useSelector((state) => state.excelSlice.classDataList);
  const isSaveButtonDisabled = classDataList.some((item) => {
    return item.selectedAttributes
      ? item.selectedAttributes.some((attribute) => {
          return attribute.selectedSourceAttribute === "" || attribute.selectedTargetAttribute === "";
        })
      : false;
  });
  return (
    <div>
      <Card style={{ width: "1500px", margin: "5px" }}>
        <Button onClick={addRow}>+ Add an Attribute Mapping Row</Button>
        {classMapingAttributes?.map((attribute, index) => (
          <AttributeRowComponent index={index} deleteRow={deleteRow} key={index} attribute={attribute} />
        ))}
      </Card>

      <div>
        <Button onClick={save} disabled={isSaveButtonDisabled}>
          Save
        </Button>
        {/* <Button onClick={cancel}>Cancel</Button> */}
      </div>
    </div>
  );
}
