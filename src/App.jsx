import data from './Data';
import './App.css'
import { useEffect, useState } from 'react';
import Map from 'react-map-gl/maplibre';


function App() {

  var [lat, setLat] = useState(0);
  var [long, setLong] = useState(0);

  var [filterData, setFilterData] = useState([])

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
      <form action="" onSubmit={nearbyFinder}>
        <input type="text" name="lat" onChange={(e) => { setLat(e.target.value) }} />
        <input type="text" name="long" onChange={(e) => { setLong(e.target.value) }} />
        <button type='submit'>Submit</button>
      </form>

      <table border={2} >
        <tr>
          <th>Name</th>
          <th>Latitude, Longitude</th>
          <th>Distance</th>
        </tr>

        {
          filterData.map((p) => (
            <tr>
              <td> {p.name} </td>
              <td> {p.lat}, {p.long} </td>
              <td> {p.distance}</td>
            </tr>
          ))
        }
      </table>

      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{width: 600, height: 400}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=AAPK5ce636ef91b4464784de693a6a7da609xda4UJ_NwnKSDKmDF8tGNKxochOSYyoYFsVMOXuCaRR3d0gtY-X8_G3M6Q_iuMgV"
        />

    </>
  )
}

export default App
