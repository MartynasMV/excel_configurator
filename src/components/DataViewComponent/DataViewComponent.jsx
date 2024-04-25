import { Card } from "primereact/card";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import DataViewRowComponent from "../DataViewRowComponent/DataViewRowComponent";
import xmlbuilder from "xmlbuilder";
import { useState } from "react";

export default function DataViewComponent() {
  const classDataList = useSelector((state) => state.excelSlice.classDataList);
  //console.log(classDataList);

  const [xmlString, setXmlString] = useState("");
  const convertToXml = () => {
    let xmlRoot = xmlbuilder
      .create("adoxx", { version: "1.0", encoding: "UTF-8" })
      .att("platformversion", "28.1.54525")
      .ele("conf");

    classDataList.forEach((classData, index) => {
      if (classData.selectedTargetClass && classData.selectedTargetClass.aDisplayName) {
        let sheet = xmlRoot.ele("sheet", {
          name: classData.selectedTargetClass.aDisplayName.en,
          class_name: classData.selectedTargetClass.sName,
          id: index + 1,
          relation: "false",
          data_row: "2",
        });

        classData.selectedAttributes.forEach((attribute, attributeIndex) => {
          let attributeElement = {
            name: attribute.selectedTargetAttribute.sName,
            type: attribute.selectedTargetAttribute.pureAttrType,
            column: attributeIndex + 1,
            context: "en",
          };
          if (attribute.selectedTargetAttribute.enumValues !== undefined) {
            let enumValues = attribute.selectedTargetAttribute.enumValues;

            let modifiedEnumValues = [];

            for (let i = 0; i < enumValues.length; i++) {
              modifiedEnumValues.push(enumValues[i]);
              if (i < enumValues.length) {
                modifiedEnumValues.push("v" + i);
              }
            }

            attributeElement.domain_mapping = modifiedEnumValues.join(",");
          }

          if (attribute.selectedTargetAttribute.pureAttrType === "enum_list") {
            attributeElement.separator = ";";
          }
          if (attribute.selectedTargetAttribute.pureAttrType === "bool") {
            attributeElement.bool_mapping = "true,false";
          }

          sheet.ele("attribute", attributeElement);
        });
      }
    });

    // Converting the XML root to a string
    let xmlString = xmlRoot.end({ pretty: true });
    setXmlString(xmlString); //keeping if I want to display it in the UI

    // Create a Blob from the XML string
    var blob = new Blob([xmlString], { type: "application/xml" });

    // Creating a link element
    var downloadLink = document.createElement("a");

    // Creating a downloadable URL from the Blob
    downloadLink.href = URL.createObjectURL(blob);

    // Setting the download attribute of the link to the desired file name
    downloadLink.download = "metamodel.xml";

    // Append the link to the document body
    document.body.appendChild(downloadLink);

    // Programmatically clicking the link to trigger the download
    downloadLink.click();

    // Remove the link from the document body
    document.body.removeChild(downloadLink);
    //console.log(xmlString);
  };
  //not letting to save before all the target classes are selected
  const allTargetClassesSelected = classDataList.every((classData) => classData.selectedTargetClass);

  return (
    <>
      <Card style={{ width: "1600px", margin: "50px" }}>
        {classDataList.map((classData, index) => (
          <DataViewRowComponent key={index} classData={classData} index={index} />
        ))}
        {classDataList.length > 0 && (
          <Button onClick={() => convertToXml()} disabled={!allTargetClassesSelected}>
            <p>Save</p>
          </Button>
        )}
        {xmlString && <h2 style={{ textAlign: "left" }}>XML Preview:</h2>}

        {/* Displaying the XML string in a pre tag */}
        <pre style={{ textAlign: "left" }}>{xmlString}</pre>
      </Card>
    </>
  );
}
