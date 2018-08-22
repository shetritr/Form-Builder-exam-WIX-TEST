import React from "react";
import ContestPreview from "./contestPreview";

const ContestList = ({ contests }) => {
  return (
    <div className="ContestsList">
      {contests.map(contest => (
        <ContestPreview key={contest.id} {...contest} />
      ))}
    </div>
  );
};

export default ContestList;
