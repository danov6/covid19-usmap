import React from "react";

const Statistics = ({ cases, deaths, recovered }) => {
  return (
    <table
      style={{
        width: "100%",
        fontSize: "2em",
        marginTop: "8%",
        backgroundColor: "#2d2d2d",
        borderRadius: 6
      }}
    >
      <thead>
        <tr>
          <td>Cases</td>
          <td>Deaths</td>
          <td>Recoveries</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ fontSize: "1.5em" }}>{cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          <td style={{ color: "red", fontSize: "1.5em" }}>{deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          <td style={{ color: "#5aff5a", fontSize: "1.5em" }}>{recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;
