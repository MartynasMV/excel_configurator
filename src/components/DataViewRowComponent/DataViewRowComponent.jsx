import React from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteRow } from "../../redux/slices/excelSlice";
import metamodel from "../../metamodels/target-metamodel.json";
import { getSelectedTargetClass } from "../../utilities/getFilteredClasses";
import { setSelectedTargetClass } from "../../redux/slices/excelSlice";

export default function DataViewRowComponent({ classData, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const targetMetamodelClasses = getSelectedTargetClass(metamodel);

  const selectedTargetClass = useSelector(
    (state) => state.excelSlice.classDataList.find((data) => data.id === classData.id)?.selectedTargetClass
  );

  const handleDeleteRow = () => {
    dispatch(deleteRow(classData.id));
  };
  //not letting to change the dropdown if the attributes are already selected
  const classDataList = useSelector((state) => state.excelSlice.classDataList);
  const isDropdownDisabled = (id) => {
    const currentItem = classDataList.find((item) => item.id === id);
    return currentItem.selectedAttributes
      ? currentItem.selectedAttributes.some((attribute) => {
          return attribute.selectedSourceAttribute !== "" && attribute.selectedTargetAttribute !== "";
        })
      : false;
  };
  const isDisabled = isDropdownDisabled(classData.id);

  return (
    <>
      <Card style={{ width: "950px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>{classData.selectedSourceClass}</h2>
          <Dropdown
            disabled={isDisabled}
            options={targetMetamodelClasses}
            value={{ selectedTargetClass: selectedTargetClass }} //had to wrap it so it could work with optionLabel
            onChange={(e) => {
              dispatch(setSelectedTargetClass({ id: classData.id, value: e.value }));
            }}
            optionLabel={(option) => option.selectedTargetClass.aDisplayName.en}
            placeholder="Select a Target Class"
          />

          <Button
            disabled={!selectedTargetClass}
            onClick={() => {
              navigate(`/attributemapping/${classData.id}`);
            }}
          >
            <p>Assign Attributes</p>
          </Button>
          <Button onClick={() => handleDeleteRow()} className="p-button-danger">
            <p>Delete</p>
          </Button>
        </div>
      </Card>
    </>
  );
}
