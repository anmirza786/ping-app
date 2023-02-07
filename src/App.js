import './App.css';
import { regions } from './regions';
import axios from 'axios'
import logo from './logo.svg';
import { useCallback, useEffect, useMemo, useState } from 'react'
import Table from './Table';

// const instance = axios.create()

// instance.interceptors.request.use((config) => {
//   config.headers['request-startTime'] = new Date().getTime();
//   return config
// })

// instance.interceptors.response.use((response) => {
//   const currentTime = new Date().getTime()      
//   const startTime = response.config.headers['request-startTime']      
//   response.headers['request-duration'] = currentTime - startTime      
//   return response
// })

// function ping(host) {

//   var started = new Date().getTime();

//   var http = new XMLHttpRequest();
//   let sig;

//   http.open("GET", "http://" + host, /*async*/true);
//   http.onreadystatechange = function() {
//     if (http.readyState === 1) {
//       var ended = new Date().getTime();

//       var milliseconds = ended - started;
//       sig=milliseconds
//     }
//   };
//   try {
//     http.send(null);
//     console.log(sig)
//   } catch(exception) {
//     // this is expected
//   }

// }
const instance = axios.create() 
instance.interceptors.request.use((config) => {
  config.headers['request-startTime'] = new Date().getTime();
  return config
})

instance.interceptors.response.use((response) => {
  const currentTime = new Date().getTime()      
  const startTime = response.config.headers['request-startTime']      
  response.headers['request-duration'] = currentTime - startTime      
  return response
})

const ping = async (url,data, timeout = 6000) => {
  return await new Promise((resolve, reject) => {
    const urlRule = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
    if (!urlRule.test(url)) reject('invalid url');
    let start = new Date().getTime();
    try {
      fetch(url)
        .then(() => {
          const currentTime = new Date().getTime()
          const newdata = {
            ...data,
            pingtime:currentTime-start
          }
          
          resolve(newdata)
        })
        .catch(() => {
          const newdata = {
            ...data,
            pingtime:0
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
  useMemo(()=>{
    return setNewDataPing(newdataping)  
  },[newdataping])
  useEffect(()=>{
    return setNewDataPing(newdataping)  
  },[newdataping])
  useCallback(()=>{
    return setNewDataPing(newdataping)  
  },[newdataping])
  // setTimeout(async () => {
  //   regions.forEach(r=>{
  //     ping(`https://dynamodb.${r.regionName}.amazonaws.com/ping?x=35gg91n9v9i00`)
  // .then(res=>console.log(res))
  // .catch(e=>console.log(""))
  //     // await ping()
  // })
  //  }, 10000);
  let newarray = []
  async function handelping (){
    newarray = []
    await regions.forEach(r=>{
      let newdata = {
        name:r.displayName,
        geography: r.geography,
        regionName: r.regionName
      }
      ping(`https://dynamodb.${r.regionName}.amazonaws.com/ping?x=35gg91n9v9i00`,newdata)
      .then(res=>
        {
          
          // console.log(res)
          newarray.push(res)
          // console.log(newarray)
        }
        )
        .catch(e=>console.log(""))
        setNewDataPing(newarray)
      })
      
      renderTable()
  }
  function renderTable(){
    
      if (newdataping)
        return <Table data = {newdataping}/>
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
