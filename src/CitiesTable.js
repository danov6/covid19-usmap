import React from "react";
import moment from "moment"

const CitiesTable = ({ cities, lastUpdated }) => {
  const city_data = cities.cases.sort().map(city => {
    return (
      <tr key={city.name}>
        <td>{city.name.replace(", US", "")}</td>
        <td>{city.name.replace(", US", "")}</td>
        <td>{city.cases}</td>
        <td>{city.deaths}</td>
        <td>
          {moment(new Date(lastUpdated))
            .startOf("hour")
            .fromNow()}
        </td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      {/* <h1>{props.selectedState.province}</h1> */}
      <table
        style={{ width: "100%", fontSize: "1.2em", color: "#fff" }}
        className="table table-striped table-sm"
      >
        <thead>
          <tr>
            <th>City</th>
            <th>Total Cases</th>
            <th>Deaths</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>{city_data}</tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
