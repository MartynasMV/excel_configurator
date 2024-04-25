import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  classDataList: [
    // //this example data but I recommend using "Upload Excel" file in UI and upload example Excel file from /src/file-example.xlsx "
    // {
    //   id: "c976162b-3487-431b-93ee-a4e915ae1640",
    //   selectedSourceClass: "Applications",
    //   sourceClassAttributes: ["App Availability", "App Description", "App ID", "App Name", "App Need for Action"],
    //   selectedTargetClass: { sName: "C_APPLICATION", aDisplayName: { en: "Application" } },
    //   selectedAttributes: [
    //     {
    //       selectedAttributesID: "90ad4f1e-76c5-4683-b72f-e13c16a8a777",
    //       selectedSourceAttribute: "App Availability",
    //       selectedTargetAttribute: {
    //         sName: "AUTHOR",
    //         aDisplayName: { en: "Author" },
    //         pureAttrType: "simple",
    //       },
    //     },
    //     {
    //       selectedAttributesID: "39b263cf-d480-4de0-9529-4936c101789c",
    //       selectedSourceAttribute: "App Name",
    //       selectedTargetAttribute: {
    //         sName: "NAME",
    //         aDisplayName: { en: "Name" },
    //         pureAttrType: "simple",
    //       },
    //     },
    //     {
    //       selectedAttributesID: "1ccd4cbd-e9fd-406e-bf3e-3614d52be595",
    //       selectedSourceAttribute: "App Description",
    //       selectedTargetAttribute: {
    //         sName: "A_DESCRIPTION",
    //         aDisplayName: { en: "Description" },
    //         pureAttrType: "simple",
    //       },
    //     },
    //   ],
    // },
    // {
    //   id: "ec9b68e3-11e9-48a8-b0f4-a5a9f3c9fc68",
    //   selectedSourceClass: "Artifacts",
    //   sourceClassAttributes: ["Artifact Description", "Artifact ID", "Artifact Name"],
    //   selectedTargetClass: { sName: "C_APPLICATION", aDisplayName: { en: "Application" } },
    //   selectedAttributes: [
    //     {
    //       selectedAttributesID: "c83b8a42-8f28-4900-9dbb-889c60da21ef",
    //       selectedSourceAttribute: "Artifact ID",
    //       selectedTargetAttribute: {
    //         sName: "PROPERTIES",
    //         aDisplayName: { en: "Properties" },
    //         pureAttrType: "PROPERTIES",
    //       },
    //     },
    //     {
    //       selectedAttributesID: "97f81c1f-ff63-4d7c-b2be-7e5d30860e4e",
    //       selectedSourceAttribute: "Artifact Name",
    //       selectedTargetAttribute: {
    //         sName: "A_EXPLANATION",
    //         aDisplayName: { en: "Reason" },
    //         pureAttrType: "simple",
    //       },
    //     },
    //   ],
    // },
  ],
};
const excelSlice = createSlice({
  name: "excel",
  initialState,
  reducers: {
    updateSourceDataFromExcel: (state, action) => {
      state.classDataList = action.payload;
    },
    setSelectedTargetClass: (state, action) => {
      const { id, value } = action.payload;
      const classData = state.classDataList.find((data) => data.id === id);
      if (classData) {
        const { selectedTargetClass } = value;
        classData.selectedTargetClass = selectedTargetClass;
      }
    },
    deleteRow: (state, action) => {
      state.classDataList = state.classDataList.filter((classData) => classData.id !== action.payload);
    },
    //creates a new empty attribute array in the selected class
    addAttributeArray: (state, action) => {
      const { id } = action.payload;
      const classData = state.classDataList.find((data) => data.id === id);
      if (classData) {
        if (!classData.selectedAttributes) {
          classData.selectedAttributes = [];
        }
        classData.selectedAttributes.push({
          selectedAttributesID: uuid(),
          //parentID: id,
          selectedSourceAttribute: "",
          selectedTargetAttribute: "",
        });
      }
    },
    resetAttributeArray: (state, action) => {
      const { id } = action.payload;
      const classData = state.classDataList.find((data) => data.id === id);
      if (classData) {
        classData.selectedAttributes = []; // Reset selectedAttributes array
      }
    },

    deleteAttributeArray: (state, action) => {
      const { id, index } = action.payload;
      const classData = state.classDataList.find((data) => data.id === id);
      if (classData && classData.selectedAttributes) {
        classData.selectedAttributes.splice(index, 1);
      }
    },
    //fills in the selectedSourceAttribute to the empty attribute array
    updateSelectedSourceAttribute: (state, action) => {
      const { id, selectedAttributesID, value } = action.payload;
      const classData = state.classDataList.find((data) => data.id === id);
      const selectedAttribute = classData.selectedAttributes.find(
        (attr) => attr.selectedAttributesID === selectedAttributesID
      );
      selectedAttribute.selectedSourceAttribute = value;
    },
    //fills in the selectedTargetAttribute to the empty attribute array
    updateSelectedTargetAttribute: (state, action) => {
      const { id, selectedAttributesID, value } = action.payload;
      const classData = state.classDataList.find((data) => data.id === id);
      const selectedAttribute = classData.selectedAttributes.find(
        (attr) => attr.selectedAttributesID === selectedAttributesID
      );
      selectedAttribute.selectedTargetAttribute = value;
    },
    updateEnumValue: (state, action) => {
      //console.log("Action received:", action);
      const { selectedAttributesID, newEnumValues } = action.payload;
      // Iterating over the classDataList
      for (const classData of state.classDataList) {
        if (!classData.selectedAttributes) {
          continue;
        }
        // Finding the attribute with the matching selectedAttributesID
        const attribute = classData.selectedAttributes.find(
          (attr) => attr.selectedAttributesID === selectedAttributesID
        );
        if (attribute) {
          // Updating the enumValues
          attribute.selectedTargetAttribute.enumValues = newEnumValues;
          break; // Exititing the loop once the attribute is found and updated
        }
      }
    },
  },
});

export const {
  updateSourceDataFromExcel,
  deleteRow,
  setSelectedTargetClass,
  addAttributeArray,
  resetAttributeArray,
  deleteAttributeArray,
  updateSelectedSourceAttribute,
  updateSelectedTargetAttribute,
  updateEnumValue,
} = excelSlice.actions;

export default excelSlice.reducer;
