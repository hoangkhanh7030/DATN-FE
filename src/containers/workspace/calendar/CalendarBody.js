import React, { useState, Fragment, useEffect } from "react";
import * as _ from "underscore";
import TeamRow from "./TeamRow";
import ResourceRow from "./ResourceRow";
import { useSelector } from "react-redux";

export default function CalendarBody({
  calendar = [],
  view = 1,
  teams = [],
  resources = [],
  handleRenameTeam,
  handleDeleteBooking,
  handleAddResource,
  setUploading,
  handleOpenDialog,
}) {
  const newTeams = _.isEmpty(teams) ? Array(2).fill({}) : teams;
  const [isOpenTeam, setOpenTeam] = useState(Array(2).fill(true));
  const storeDashboard = useSelector((state) => state.dashboard);
  useEffect(() => {
    if (!storeDashboard.data) {
      return;
    }

    setOpenTeam(
      _.get(storeDashboard, ["data", "teams"])
        ? Array(_.size(_.get(storeDashboard, ["data", "teams"]))).fill(true)
        : Array(2).fill(true)
    );
  }, [storeDashboard]);

  return newTeams.map((team, index) => {
    return (
      <Fragment key={index}>
        <TeamRow
          team={team}
          calendar={calendar}
          view={view}
          resources={resources}
          handleRenameTeam={handleRenameTeam}
          handleAddResource={handleAddResource}
          setUploading={setUploading}
          setOpenTeam={setOpenTeam}
          isOpenTeam={isOpenTeam}
          indexTeam={index}
        />

        {isOpenTeam[index] ? (
          <ResourceRow
            team={team}
            indexTeam={index}
            calendar={calendar}
            view={view}
            resources={resources}
            handleDeleteBooking={handleDeleteBooking}
            handleOpenDialog={handleOpenDialog}
          />
        ) : (
          <></>
        )}
      </Fragment>
    );
  });
}
