import React from "react";
import FormPreview from "./formPreview";

const FormList = ({ forms, onFormClick, onSubmissionsClick }) => {
  return (
    <tbody className="FormsList">
      {Object.keys(forms).map(formId => (
        <FormPreview
          key={formId}
          onFormClick={onFormClick}
          onSubmissionsClick={onSubmissionsClick}
          {...forms[formId]}
        />
      ))}
    </tbody>
  );
};

export default FormList;
