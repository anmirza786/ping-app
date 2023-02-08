import React, { useEffect, useState } from 'react';

function Table({data,pingedData}) {
    const [Data,setData] = useState([])
    useEffect(() => {
        setData(data)
        pingedData(data)
    }, [data]);
    const getAveragePing=(pingdata)=>{
        let average = 0
        let length = 0
        pingdata.forEach(ping=>{
            if(ping!==0)
                {
                    average += ping
                    length += 1
                }
        })
        average = average/length
        return Math.ceil(average)
    }
    const getMinPing=(pingdata)=>{
        let newArray = pingdata.filter(ping=>ping!==0&&ping)
        console.log(newArray)
        return Math.min(...newArray)
    }
    const getMaxPing=(pingdata)=>{
        let newArray = pingdata.filter(ping=>ping!==0&&ping)
        return Math.max(...newArray)
    }
    return (
        <table>
            <tr>
                <th>Region(Country)</th>
                <th>Region-Code</th>
                <th>Ping</th>
                <th>Min</th>
                <th>Max</th>
                <th>Average</th>
            </tr>
            {Data.map(dt=> 
            <tr>
                <td key={dt.name}>{dt.name}({dt.geography})</td>
                <td key={dt.regionName}>{dt.regionName}</td>
                <td key={`${dt.name}-100`}>{dt.pingtime.map(ping=> ping!==0 ? `${ping}ms `:"")}</td>
                <td key={`${dt.name}-200`}>{getMinPing(dt.pingtime)} ms</td>
                <td key={`${dt.name}-300`}>{getMaxPing(dt.pingtime)} ms</td>
                <td key={`${dt.name}-400`}>{getAveragePing(dt.pingtime)} ms</td>
            </tr>
            )}
        </table>

    );
}

export default Table;