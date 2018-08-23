import React from "react";
import ContestPreview from "./contestPreview";

const ContestList = ({ contests, onContestClick }) => {
  return (
    <div className="ContestsList">
      {Object.keys(contests).map(contestId => (
        <ContestPreview
          key={contestId}
          onClick={onContestClick}
          {...contests[contestId]}
        />
      ))}
    </div>
  );
};

export default ContestList;
