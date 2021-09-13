import React, { Fragment } from "react";
import * as _ from "underscore";
import ResourceCell from "./ResourceCell";
import EventRow from "./EventRow";
import { TEAM_ID, ID } from "constants/index";

export default function ResourceRow({
  calendar = [],
  resources = [],
  view = 1,
  team = {},
  indexTeam = 1,
  handleDeleteBooking,
  handleOpenDialog,
}) {
  resources = _.isEmpty(resources) ? Array(3).fill({}) : resources;
  return resources
    .filter((resource) => _.get(resource, TEAM_ID) === _.get(team, ID))
    .map((resource, index) => {
      return (
        <Fragment key={index}>
          <ResourceCell
            resource={resource}
            team={team}
            lastRsc={indexTeam === 1 && index === 2}
          />

          <EventRow
            team={team}
            calendar={calendar}
            view={view}
            resource={resource}
            handleDeleteBooking={handleDeleteBooking}
            handleOpenDialog={handleOpenDialog}
          />
        </Fragment>
      );
    });
}
