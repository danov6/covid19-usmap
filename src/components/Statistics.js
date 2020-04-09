import React, { useState, useEffect } from 'react';
import LoadingSpinner from './../LoadingSpinner';

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  const [totalTestResults, setTotalTestResults] = useState(0);
  const [negativeResults, setNegativeResults] = useState(0);
  //const [pendingResults, setPendingResults] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try{
        let res = await fetch('https://covidtracking.com/api/us');
        let data = await res.json();
        setLoading(false);
        setCases(data[0].positive);
        setDeaths(data[0].death);
        setRecovered(data[0].recovered);
        setTotalTestResults(data[0].totalTestResults);
        setNegativeResults(data[0].negative);
      }catch(e){}
    }
    fetchData();
  },[]);

  const toggleStatsDrawer = () => {
    let drawer = document.querySelector('#summary_stats_hidden');
    let drawer_button = document.querySelector('#drawer_button');
    if(drawer){
      drawer.className == "" ?
      drawer.className = "stats_drawer_active" :
      drawer.className = "";
    }
    if(drawer_button){
      drawer_button.className == "" ?
      drawer_button.className = "rotate" :
      drawer_button.className = "";
    }
  };

  return (
    <div id="summary_stats">
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <td>Cases</td>
            <td>Deaths</td>
            <td>Recoveries</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ fontSize: "1.5em" }}>{loading ? "" : cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td style={{ color: "red", fontSize: "1.5em" }}>{loading ? <LoadingSpinner /> : deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td style={{ color: "#5aff5a", fontSize: "1.5em" }}>{loading ? "" : recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr>
            <td style={{fontSize: "0.6em" }}>% of closed cases</td>
            <td style={{ color: "red", fontSize: "0.6em" }}>{Number((deaths/(deaths+recovered))*100).toFixed(1)}%</td>
            <td style={{ color: "#5aff5a", fontSize: "0.6em" }}>{Number((recovered/(deaths+recovered))*100).toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>
      <div id="summary_stats_hidden">
        <table style={{width: '100%'}}>
          <thead>
            <tr>
              <td style={{fontSize: '2vw'}}>Total Patients Tested</td>
              <td style={{fontSize: '2vw'}}>Positive</td>
              <td style={{fontSize: '2vw'}}>Negative</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: "1.5em" }}>{loading ? "" : totalTestResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td style={{ color: "red", fontSize: "1.5em" }}>{loading ? <LoadingSpinner /> : cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
              <td style={{ color: "#5aff5a", fontSize: "1.5em" }}>{loading ? "" : negativeResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            </tr>
            <tr>
              <td style={{fontSize: "0.6em" }}>% of overall tested</td>
              <td style={{ color: "red", fontSize: "0.6em" }}>{Number((cases/totalTestResults)*100).toFixed(1)}%</td>
              <td style={{ color: "#5aff5a", fontSize: "0.6em" }}>{Number((negativeResults/totalTestResults)*100).toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button id="stats_expand_button" onClick={()=>{toggleStatsDrawer()}}>
          <img src={process.env.PUBLIC_URL + '/images/down-arrow-white.png'} id="drawer_button"/>
        </button>
      </div>
    </div>
  );
};

export default Statistics;
