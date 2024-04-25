// This function will get the targetClass and metamodel as arguments and return the targetClassAttributes
export const getTargetClassAttributes = (targetClass, metamodel) => {
  const metamodelClasses = Object.values(metamodel)[0].classes;
  const metamodelAttributes = Object.values(metamodel)[0].attributes;
  const metamodelAttrtypes = Object.values(metamodel)[0].attrtypes;

  for (let i in metamodelClasses) {
    if (metamodelClasses[i].sName === targetClass.sName) {
      const classObject = metamodelClasses[i];
      const attributes = classObject.aAttributes || {};
      const notebookAttributes = classObject.notebookAttributes || [];
      const combinedAttributes = notebookAttributes.filter((value) => Object.values(attributes).includes(value));

      let targetClassAttributes = combinedAttributes.reduce((acc, value) => {
        const id = Object.keys(attributes).find((key) => attributes[key] === value);
        const { sName, aDisplayName, type, constraint } = metamodelAttributes[id];
        const bComplexCheck = metamodelAttrtypes[type].bComplex;
        const attrType = metamodelAttrtypes[type].sName;
        let pureAttrType;
        //xml template accepts only specific attributes like simple, date, enum, enum_list, bool etc so we need to map the metamodel attributes to these types
        switch (attrType) {
          case "LONGSTRING":
          case "ADOSTRING":
          case "SHORTSTRING":
          case "STRING":
          case "INTEGER":
          case "DOUBLE":
            pureAttrType = "simple";
            break;
          case "UTC":
            pureAttrType = "date";
            break;
          case "ENUMLIST":
            pureAttrType = "enum_list";
            break;
          default:
            pureAttrType = attrType.toLowerCase();
        }
        //if the attribute is complex we skip it
        if (bComplexCheck) {
          return acc;
        }

        // Checking if constraint.en exist and return them if it does as a list
        const constraintValue = constraint && constraint.en ? constraint.en.split("@") : undefined;

        acc.push({
          sName,
          aDisplayName,
          pureAttrType,
          enumValues: pureAttrType === "enum" || pureAttrType === "enum_list" ? constraintValue : undefined,
          // constraint: constraintValue,
        });
        return acc;
      }, []);
      // Sort the attributes by aDisplayName.en
      targetClassAttributes = targetClassAttributes.sort((a, b) => a.aDisplayName.en.localeCompare(b.aDisplayName.en));

      return targetClassAttributes;
    }
  }
  return null;
};
//previous version
// export const getTargetClassAttributes = (targetClass, metamodel) => {
//   const metamodelClasses = Object.values(metamodel)[0].classes;
//   const metamodelAttributes = Object.values(metamodel)[0].attributes;

//   for (let classId in metamodelClasses) {
//     if (metamodelClasses[classId].sName === targetClass.sName) {
//       const classObject = metamodelClasses[classId];
//       const attributes = classObject.aAttributes || {};
//       const notebookAttributes = classObject.notebookAttributes || [];
//       const combinedAttributes = notebookAttributes.filter((value) => Object.values(attributes).includes(value));
//       //simlifying = removing uncecessary details about the attributes
//       let targetClassAttributes = combinedAttributes.map((value) => {
//         const id = Object.keys(attributes).find((key) => attributes[key] === value);
//         const { sName, aDisplayName } = metamodelAttributes[id];
//         return { sName, aDisplayName };
//       });
//       //in case I want to get more/all info about the attributes replace the above code with the below
//       // let targetClassAttributes = combinedAttributes.map((value) => {
//       //   const id = Object.keys(attributes).find((key) => attributes[key] === value);
//       //   return metamodelAttributes[id];
//       // });
//sample how "more info looks like":
// {
//   id: '{9d8c0c4a-3813-49e1-9c34-db74b708f234}',
//   sName: 'A_NEED_FOR_ACTION',
//   aDisplayName: { en: 'Action required' },
//   type: '{1bc21e90-4a0b-4b43-be6f-2f60a0d8dc11}',
//   constraint: { all: '' },
//   bClassAttribute: false,
//   bContextSpecific: false,
//   bMultiLingual: false,
//   bTimefilterRelevant: false,
//   bSystemAttribute: false,
//   infotext: {
//     en:
//       'If there is any action required concerning this object, mark the box and explain your decision here. Marked objects will be highlighted in a number of views (for example: Dependency Analysis).'
//   }
// },

//       // Sort the attributes by aDisplayName.en
//       targetClassAttributes = targetClassAttributes.sort((a, b) => a.aDisplayName.en.localeCompare(b.aDisplayName.en));

//       // return { targetClassAttributes };
//       return targetClassAttributes;
//     }
//   }
//   return null;
// };
