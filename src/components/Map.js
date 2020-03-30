import React, { useState } from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';

const Map = () => {
  const [ viewport, setViewport ] = useState({
    latitude: 38.219860,
    longitude: -96.500965,
    height: '80vh',
    width: '100%',
    borderRadius: 5,
    margin: '5% 0%',
    minZoom: 3
  });
    return (
      <div>
      <ReactMapGL
      {...viewport}
      mapboxApiAccessToken='pk.eyJ1IjoiZ2x2YWxkZXoiLCJhIjoiY2s4ZGVsamIxMHRqazNsb3d1aDN6bmNvMCJ9.AzXsa9tQkXmdzyXaDUdqJw'
      mapStyle="mapbox://styles/glvaldez/ck8df394y0hn51imqb0n3yu9v"
      onViewportChange={viewport => {
        setViewport(viewport)
      }}>
      </ReactMapGL>
      </div>

      //   <MapboxMap
      //   style="mapbox://styles/glvaldez/ck8df394y0hn51imqb0n3yu9v"
      //   containerStyle={{
      //     height: '70vh',
      //     borderRadius: 5,
      //     margin: '5% 0%'
      //   }}
      //   center={[-96.500965, 38.219860]}
      //   zoom={[3]}
      // >
      // <Source type="geojson" data={data}>
      //   <Layer />
      // </Source>
      //       <Layer
			// 	type="circle"
			// 	id="participant-marker"
			// 	paint={{
			// 		'circle-stroke-width': 3,
			// 		'circle-radius': 5,
			// 		'circle-blur': 0.15,
			// 		'circle-color': '#3770C6',
			// 		'circle-stroke-color': 'white'
			// 	}}
			// >
      //           <Feature
			// 		coordinates={[-96.500965, 38.219860]}
			// 		draggable
			// 		// onDragEnd={evt => this.props.onDragEnd(evt, participant.guid)}
			// 	/>
			// </Layer>
    );
}

export default Map;
