import { Navigate } from "react-router-dom";
import AtributeMappingComponent from "../components/AtributeMappingComponent";

export default [
  {
    path: "/",
    redirect: <Navigate to={"/classmappings"}></Navigate>,
  },
  {
    path: "/classmappings",
    label: "Class Mappings",
    Component: <ClassMappingPage />,
  },
  {
    path: "/attributemapping/:id",
    label: "attributemapping PAGE ",
    Component: <AtributeMappingComponent />,
  },
];
