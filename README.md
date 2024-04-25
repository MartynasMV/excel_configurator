# Excel Configurator

Excel Configurator is a web application designed to streamline the process of working with Excel files and metamodel. It allows you to upload an Excel file, read its contents, map it with a metamodel, and generate an XML file.

## Installation and Setup

Before you can use the Excel Configurator, you need to set it up on your local machine. Follow these steps:

1. **Clone the repository**: Clone this repository to your local machine using `git clone git@github.com:MartynasMV/excel_configurator.git`.
2. **Install dependencies**: Navigate to the project directory and run `npm install` to install the necessary dependencies.
3. **Start the application**: Once the installation is complete, you can start the application by running `npm start`.

Now, you should be able to access the application at `http://localhost:3000`

## Features

- **Excel File Upload**: The application provides an interface to upload your Excel files easily.
- **Excel File Reading**: After uploading, the application reads the contents of the Excel file.
- **Metamodel Mapping**: The application allows you to map the contents of the Excel file with a metamodel. This feature is particularly useful when you want to import data from an Excel file into a system that uses a specific metamodel.
- **XML File Generation**: Once the mapping is done, the application generates an XML file. This XML file can be used for various purposes such as data exchange, backup, etc.

## How to Use

1. **Upload your Excel file**: Click on the 'Upload' button and select the Excel file you want to work with. (example file-example.xlsx can be found in src/)
2. **Read the Excel file**: After uploading, the application will automatically read the contents of the Excel file.
3. **Map with the metamodel**: Select "Assign Attributes" and in the dropdown select Source Attributes (from Excel) and Target attributes (from the metamodel).
4. **Generate XML file**: Once the mapping is done, click on the 'Save' button. The application will create an XML file.
