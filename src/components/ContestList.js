import React from "react";
import ContestPreview from "./contestPreview";

const ContestList = ({ contests, onFormClick, onSubmissionsClick }) => {
  return (
    <tbody className="ContestsList">
      {Object.keys(contests).map(contestId => (
        <ContestPreview
          key={contestId}
          onFormClick={onFormClick}
          onSubmissionsClick={onSubmissionsClick}
          {...contests[contestId]}
        />
      ))}
    </tbody>
  );
};

export default ContestList;
