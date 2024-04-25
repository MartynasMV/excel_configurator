// This function will extract the selectedTargetClass
export const getSelectedTargetClass = (metamodel) => {
  const lockingOnClasses = Object.values(metamodel)[0].classes;
  const allClasses = Object.values(lockingOnClasses);

  // Filtering only the classes with bRepositoryClass: true
  const filteredClasses = allClasses.filter(
    (classObject) =>
      classObject.bVisible === true && classObject.bRepositoryClass === true && classObject.bAbstract === false
  );

  // Sort the classes by their aDisplayName.en value
  const sortedClasses = filteredClasses.sort((a, b) => a.aDisplayName.en.localeCompare(b.aDisplayName.en));

  // Return the selectedTargetClass
  return sortedClasses.map((classObject) => {
    const sName = classObject.sName;
    const aDisplayName = classObject.aDisplayName;
    return { selectedTargetClass: { sName, aDisplayName } };
  });
};

//previous version:

// export const getFilteredClasses = (metamodel) => {
//   const lockingOnClasses = Object.values(metamodel)[0].classes;
//   const allClasses = Object.values(lockingOnClasses);

//   //filtering only the classes with bRepositoryClass: true
//   const filteredClasses = allClasses.filter(
//     (classObject) =>
//       classObject.bVisible === true && classObject.bRepositoryClass === true && classObject.bAbstract === false
//   );

//   // Sort the classes by their aDisplayName.en value
//   const sortedClasses = filteredClasses.sort((a, b) => a.aDisplayName.en.localeCompare(b.aDisplayName.en));

//   // applying the getClassWithAttributes function to each CLASS OBJECT and getting a new object with className and attributes
//   return sortedClasses.map((classObject) => getClassWithAttributes(classObject, metamodel));
// };
// const getClassWithAttributes = (classObject, metamodel) => {
//   const displayName = classObject.aDisplayName.en.replace(/\[|\]/g, "");
//   const sName = classObject.sName;
//   const aDisplayName = classObject.aDisplayName;

//   const attributesInMetamodel = Object.values(metamodel)[0].attributes;
//   const attributes = classObject.aAttributes || {};
//   const notebookAttributes = classObject.notebookAttributes || [];
//   const combinedAttributes = notebookAttributes.filter((value) => Object.values(attributes).includes(value));

//   // Create an array of objects with id and value of each attribute
//   const attributesWithId = combinedAttributes.map((value) => {
//     const id = Object.keys(attributes).find((key) => attributes[key] === value);
//     return { id, value };
//   });

//   // Create an array of all IDs
//   const allIds = attributesWithId.map((attribute) => attribute.id);

//   // Collect all display names for the IDs that match with allIds
//   const targetClassAttributesUnsorted = allIds.map((id) => attributesInMetamodel[id]?.aDisplayName?.en).filter(Boolean);
//   //sorting attributes alphabetically
//   const targetClassAttributes = targetClassAttributesUnsorted.sort();

//   return {
//     selectedTargetClass: { sName, aDisplayName },
//     targetClassAttributes,
//   };
// };
