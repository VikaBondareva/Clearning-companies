import { Formik } from "formik";
import React from "react";
import EditProfileSchemaValid from "./EditProfileSchemaValid";
import EditProfileCompany from "./EditProfileCompany";

export function EditCompany({ error, company, saveChanged }) {
  return (
    <Formik
      initialValues={{
        ...company,
        error,
        actionName: "",
        removeIndex: null,
        removeIndexService: null
      }}
      validationSchema={EditProfileSchemaValid}
      onSubmit={(values, {setValues}) => {
        const { error,actionName, removeIndex,removeIndexService,...profile } = values;
        console.log("submit, isNext : " +values.actionName+" index: ")
        if(actionName === "save") {
          saveChanged(profile);
        }
        else if (actionName === "addDay") {
          console.log("add action");
          values.workPlan.push({day: '', start: "07:00", end: "17:00"});
          setValues(values);
        } else if (actionName === "deleteDay") {
          values.workPlan.pop(removeIndex);
          setValues(values); 
        } else if (actionName==="addService") {
          values.services.push({name: '', coefficient: ""});
          setValues(values);
        } else if (actionName === "removeService"){
          values.services.pop(removeIndexService);
          setValues(values); 
        }
      }}
      component={EditProfileCompany}
    />
  );
}