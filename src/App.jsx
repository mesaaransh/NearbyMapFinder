import data from './Data';
import './App.css'
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import pilotMarker from "./assets/pilot-marker.svg"
import targetMarker from "./assets/target-marker.svg"
import { Icon } from 'leaflet';


function App() {

  var [lat, setLat] = useState(0);
  var [long, setLong] = useState(0);
  var [filterData, setFilterData] = useState([])

  const customIcon = new Icon({
    iconUrl: pilotMarker,
    iconSize: [25, 25]
  });

  const targetIcon = new Icon({
    iconUrl: targetMarker,
    iconSize: [38, 38]
  });

  function distance(lat1, lat2, lon1, lon2) {

    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula 
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956 for miles
    let r = 6371;
    // calculate the result
    return (c * r);
  }

  function nearbyFinder(e) {
    e.preventDefault();

    var filteredData = data.filter((p) => {
      var x = distance(lat, p.lat, long, p.long);
      return (x < 2 ? true : false);
    }).map((p) => {
      var newobj = {
        ...p,
        distance: Math.round(distance(lat, p.lat, long, p.long) * 1000) / 1000
      }
      return newobj;
    }).sort((a, b) => a.distance - b.distance)
    setFilterData(filteredData);
  }

  return (
    <>

      <div className="container">
        <div className="pannel">

          <center>
            <h1>Pilot Finder</h1>
          </center>

          <form action="" onSubmit={nearbyFinder} className='cordinateInputForm'>
            <div>
              <input placeholder='Latitude' type="text" name="lat" onChange={(e) => { setLat(e.target.value) }} />
              <input placeholder='Longitude' type="text" name="long" onChange={(e) => { setLong(e.target.value) }} />
            </div>
            <button type='submit'>Submit</button>
          </form>


          <div className="results">

            <h3>Best Results: </h3>
            {
              filterData.map((p, i) => (
                i < 3 ?
                  <div className='resultBox'>
                    <div className='left'>
                      <h2>{p.name}</h2>
                      <p>{p.long}, {p.lat}</p>
                    </div>
                    <div className='right'>
                      {p.distance} Km
                    </div>
                  </div>
                  :
                  <></>
              ))
            }
            
            
            <h3 style={{marginTop: "20px"}}>Other Results: </h3>
            <table border={2} className='resultTable'>
              <tr>
                <th>Name</th>
                <th>Latitude, Longitude</th>
                <th>Distance</th>
              </tr>

              {
                filterData.map((p, i) => (
                  i > 3 ?
                    <tr>
                      <td> {p.name} </td>
                      <td> {p.lat}, {p.long} </td>
                      <td> {p.distance}</td>
                    </tr> :
                    <></>
                ))
              }
            </table>

          </div>

        </div>
        <div className="map">

          <MapContainer center={[30.3564242, 76.3647012]} zoom={14} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filterData.map((marker, index) => (
              <Marker position={[marker.lat, marker.long]} icon={customIcon}>
                <Popup>{marker.name}</Popup>
              </Marker>
            ))}

            <Marker position={[lat, long]} icon={targetIcon}></Marker>
          </MapContainer>

        </div>
      </div>
    </>
  )
}

export default App
