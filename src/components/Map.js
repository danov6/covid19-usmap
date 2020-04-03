import React, { useState } from 'react';
import ReactMapGL, {Source, Layer, Marker} from 'react-map-gl';
import Cities from './../constants/Cities.json';
import States from './../constants/States';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const Map = ({cityData, states, setCity}) => {
  const [ viewport, setViewport ] = useState({
    latitude: 38.219860,
    longitude: -96.500965,
    height: '80vh',
    width: '100%',
    borderRadius: 5,
    margin: '5% 0%',
    minZoom: 3,
    altitude: 4
  });

  let markers = [];
  for(var i = 0; i < Cities.length; i++){
    var state = Cities[i].state;
    for(var j = 0; j < states[state].length; j++){
      if(states[state][j].city.indexOf(Cities[i].city) != -1 &&
         states[state][j].province === Cities[i].state &&
         states[state][j].confirmed != 0){
        markers.push({
          cases: states[state][j].confirmed,
          deaths: states[state][j].deaths,
          data: Cities[i]
        });
        break;
      }
    }
  }
  // var markerColor = d3.scaleQuantize()
  //   .domain([1, 1000])
  //   .range(["yellow", "red"]);
    return (
      <div style={{margin: 10}}>
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiZ2x2YWxkZXoiLCJhIjoiY2s4ZGVsamIxMHRqazNsb3d1aDN6bmNvMCJ9.AzXsa9tQkXmdzyXaDUdqJw'
        mapStyle="mapbox://styles/glvaldez/ck8df394y0hn51imqb0n3yu9v"
        onViewportChange={viewport => {
          setViewport(viewport)
        }}
        >
          {/* <Marker latitude={40.7127837} longitude={-74.0059413}>
            <p style={{color: 'red'}}>.</p>
          </Marker> */}

        {markers.map((c,i) => {
          return (
            <Marker latitude={c.data.latitude} longitude={c.data.longitude} key={i}>
               <div style={{color: 'red', fontSize: 20, cursor: 'pointer', top: -20, position: 'absolute'}} onClick={() => {setCity(c)}} className="map_marker" data-tooltip={c.data.city + "," + States[c.data.state].replace('US-','')}>.</div>
            </Marker>
          )
        })}
        </ReactMapGL>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  setCity: data => dispatch({ type: 'SET_CITY', data })
});

export default connect(null, mapDispatchToProps)(Map);
