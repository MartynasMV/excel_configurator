import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateSelectedSourceAttribute, updateSelectedTargetAttribute } from "../redux/slices/excelSlice";
import metamodel from "../metamodels/target-metamodel.json";
import { getTargetClassAttributes } from "../utilities/getFilteredAttributes";
import DomainMappingComponent from "./DomainMappingComponent";

const AttributeRowComponent = ({ index, deleteRow, attribute }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //selecting class object by id
  const selectedSourceAndTargetObjectByID = useSelector((state) =>
    state.excelSlice.classDataList.find((selectedSourceClass) => selectedSourceClass.id === id)
  );

  const [selectedSourceAttribute, setSelectedSourceAttribute] = useState(attribute.selectedSourceAttribute);
  const [selectedTargetAttribute, setSelectedTargetAttribute] = useState(attribute.selectedTargetAttribute);

  //getting all the attributes of the selected target class via getTargetClassAttributes function
  const targetClassAttributesRaw = getTargetClassAttributes(
    selectedSourceAndTargetObjectByID.selectedTargetClass,
    metamodel
  );

  return (
    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <p>{`SOURCE (${selectedSourceAndTargetObjectByID.selectedSourceClass}) attributes `}</p>
      <Dropdown
        options={selectedSourceAndTargetObjectByID.sourceClassAttributes}
        value={selectedSourceAttribute}
        onChange={(e) => {
          setSelectedSourceAttribute(e.value);
          dispatch(
            updateSelectedSourceAttribute({
              id: selectedSourceAndTargetObjectByID.id,
              selectedAttributesID: attribute.selectedAttributesID,
              value: e.value,
            })
          );
        }}
        placeholder={`Select a Source Attributes from ${selectedSourceAndTargetObjectByID.selectedSourceClass} `}
      />
      <p>{`TARGET (${selectedSourceAndTargetObjectByID.selectedTargetClass.aDisplayName.en}) attributes `}</p>
      <Dropdown
        options={targetClassAttributesRaw}
        value={selectedTargetAttribute}
        onChange={(e) => {
          setSelectedTargetAttribute(e.value);
          dispatch(
            updateSelectedTargetAttribute({
              id: selectedSourceAndTargetObjectByID.id,
              selectedAttributesID: attribute.selectedAttributesID,
              value: e.value,
            })
          );
        }}
        optionLabel="aDisplayName.en"
        placeholder={`Select a Target Attributes from ${selectedSourceAndTargetObjectByID.selectedTargetClass.aDisplayName.en} `}
      />

      {attribute.selectedTargetAttribute.enumValues ? <DomainMappingComponent attribute={attribute} /> : null}
      <Button className="p-button-danger" onClick={() => deleteRow(index)}>
        Delete Row
      </Button>
    </div>
  );
};

export default AttributeRowComponent;
