import './App.css';
import Table from './Table';
import { useState } from 'react'
import { regions } from './regions';


const ping = async (url,data, timeout = 6000) => {
  return await new Promise((resolve, reject) => {
    let start = new Date().getTime();
    try {
      fetch(url)
        .then(() => {
          const currentTime = new Date().getTime()
          const newdata = {
            ...data,
            pingtime:[...data.pingtime,currentTime-start]
          }
          
          resolve(newdata)
        })
        .catch(() => {
          const newdata = {
            ...data,
            pingtime:[0]
          }
          resolve(newdata)
        });
      setTimeout(() => {
        resolve(0);
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
};

function App() {
  const [newdataping,setNewDataPing] = useState(null)
  const [testobj,setTestObj] = useState({})
  const [pingedData,setPingedData] = useState(null)
  let newarray = []
  function pingFunction (array){
    newarray = []
    array.forEach(r=>{
      let newdata
      if(testobj){
        newdata= {
          name:r.name,
          geography: r.geography,
          regionName: r.regionName,
          pingtime: r.pingtime
        }
      }
      else
      {newdata= {
        name:r.name,
        geography: r.geography,
        regionName: r.regionName,
        pingtime: []
      }}
      ping(`https://dynamodb.${r.regionName}.amazonaws.com/ping?x=35gg91n9v9i00`,newdata)
      .then(res=>
        {
          setTestObj(res)
          newarray.push(res)
        }
        )
      }) 
      setNewDataPing(newarray)
      renderTable()
  }
  function handelping (){
    if (pingedData){
      pingFunction(pingedData)
    }
    else{
      pingFunction(regions)
    }
  }
  function renderTable(){
    
    if (newdataping)
      return <Table data = {newdataping} pingedData = { setPingedData }/>
    else
      return <h1>Ping Please</h1>
  }
  return (
    <div className="App">
      <header className="App-header">
        
        <button
          className="App-link"
          onClick={handelping}
        >
          Ping
        </button>
      </header>
      <div className="data">
        {newdataping && renderTable()}
      </div>
    </div>
  );
}

export default App;
