import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { updateEnumValue } from "../redux/slices/excelSlice";

const DomainMappingComponent = ({ attribute }) => {
  const dispatch = useDispatch();

  // Getting the updated enumValues from the Redux store
  const updatedEnumValues = useSelector(() => {
    // Checking if attribute exists and has selectedTargetAttribute
    if (attribute && attribute.selectedTargetAttribute) {
      // Return the enumValues
      return attribute.selectedTargetAttribute.enumValues;
    }
    // Returning undefined if not found
    return undefined;
  });

  const [values, setValues] = useState(updatedEnumValues);

  const handleInputChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
    dispatch(
      updateEnumValue({
        selectedAttributesID: attribute.selectedAttributesID,
        newEnumValues: newValues,
      })
    );
  };

  return (
    <div>
      {values.map((value, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <InputText value={value} onChange={(e) => handleInputChange(e, index)} />
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
};

export default DomainMappingComponent;
