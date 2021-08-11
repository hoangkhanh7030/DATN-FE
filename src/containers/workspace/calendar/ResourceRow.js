import React from "react";

import ResourceCell from "./ResourceCell";

import EventRow from "./EventRow";

import * as _ from "underscore";

export default function ResourceRow({
  calendar = [],
  resources = [],
  view = 1,
  team = {},
  indexTeam = 1,
}) {
  resources = resources.length > 0 ? resources : Array(3).fill({});
  return resources
    .filter((resource) => _.get(resource, "idTeam") === _.get(team, "id"))
    .map((resource, index) => {
      return (
        <>
          <ResourceCell
            resource={resource}
            lastRsc={indexTeam === 1 && index === 2}
          />

          <EventRow
            team={team}
            calendar={calendar}
            view={view}
            resource={resource}
          />
        </>
      );
    });
}
