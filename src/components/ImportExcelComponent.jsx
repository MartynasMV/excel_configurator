import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { updateSourceDataFromExcel } from "../redux/slices/excelSlice";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { v4 as uuid } from "uuid";

const ImportExcelComponent = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();

  //handling excel file upload and storing the classes, Attributes and values to the store
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const classes = workbook.SheetNames;
      const classDataList = [];

      classes.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        if (parsedData.length > 0) {
          let sourceClassAttributes = Object.keys(parsedData[0]);
          //sorting
          sourceClassAttributes.sort();
          let id = uuid();
          classDataList.push({ id, selectedSourceClass: sheetName, sourceClassAttributes });
        }
      });

      dispatch(updateSourceDataFromExcel(classDataList));

      onUpload();
    };
  };

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <FileUpload
        mode="basic"
        name="demo[]"
        accept=".xls, .xlsx"
        maxFileSize={1000000}
        onUpload={onUpload}
        auto
        chooseLabel="Upload Excel file"
        customUpload
        uploadHandler={handleFileUpload}
      />
    </div>
  );
};

export default ImportExcelComponent;
