import React, { useState, useEffect } from 'react';
import LoadingSpinner from './../LoadingSpinner';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try{
        let res = await fetch('http://covidtracking.com/api/us');
        let data = await res.json();
        setLoading(false);
        setCases(data[0].positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        setDeaths(data[0].death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        setRecovered(data[0].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      }catch(e){
        setCases('N/A');
        setDeaths('N/A');
        setRecovered('N/A');
      }
    }
    fetchData();
  },[]);

  return (
    <table id="summary_stats">
      <thead>
        <tr>
          <td>Cases</td>
          <td>Deaths</td>
          <td>Recoveries</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ fontSize: "1.5em" }}>{loading ? "" : cases}</td>
          <td style={{ color: "red", fontSize: "1.5em" }}>{loading ? <LoadingSpinner /> : deaths}</td>
          <td style={{ color: "#5aff5a", fontSize: "1.5em" }}>{loading ? "" : recovered}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;
