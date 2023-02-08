import "./App.css";
import Table from "./Table";
import { useEffect, useState } from "react";
import { regions } from "./regions";
import axios from "axios";

// const ping = async (url, data, timeout = 6000) => {
//   return await new Promise((resolve, reject) => {
//     let start = new Date().getTime();
//     try {
//       fetch(url)
//         .then(() => {
//           const currentTime = new Date().getTime();
//           const newdata = {
//             ...data,
//             pingtime: [...data.pingtime, currentTime - start],
//           };
//           resolve(newdata);
//         })
//         .catch(() => {
//           const newdata = {
//             ...data,
//             pingtime: [0],
//           };
//           resolve(newdata);
//         });
//       setTimeout(() => {
//         resolve(0);
//       }, timeout);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

function App() {
  const [newDataPing, setNewDataPing] = useState([]);

  const pingFunction = () => {
    setNewDataPing([]);
    regions.forEach(async (r) => {
      let newdata = {
        name: r.name,
        geography: r.geography,
        regionName: r.regionName,
        availabilityZoneCount: r.availabilityZoneCount,
        pingtime: [],
      };
      // ping(
      //   `https://dynamodb.${r.regionName}.amazonaws.com/ping?x=35gg91n9v9i00`,
      //   newdata
      // ).then((res) => {
      //   setNewDataPing((prevState) => [...prevState, res]);
      // });
      let start = new Date().getTime();
      await axios
        .get(
          `https://dynamodb.${r.regionName}.amazonaws.com/ping?x=35gg91n9v9i00`
        )
        .then((res) => {})
        .catch((err) => {
          const currentTime = new Date().getTime();
          newdata = {
            ...newdata,
            pingtime: [...newdata.pingtime, currentTime - start],
          };
          setNewDataPing((prevState) => [...prevState, newdata]);
        });
    });
  };
  useEffect(() => {
    pingFunction();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button className="App-link" onClick={pingFunction}>
          Ping
        </button>
      </header>
      <div className="data">
        {newDataPing.length ? (
          <Table data={newDataPing} />
        ) : (
          <h1>Ping Please</h1>
        )}
      </div>
    </div>
  );
}

export default App;
