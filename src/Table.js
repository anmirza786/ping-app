import React, { useEffect, useState } from 'react';

function Table({data}) {
    const [Data,setData] = useState(data)
    return (
        <table>
            <tr>
                <th>Region(Country)</th>
                <th>Region-Code</th>
                <th>Ping</th>
            </tr>
            {Data.map(dt=> 
            <tr>
                <td key={dt.name}>{dt.name}({dt.geography})</td>
                <td key={dt.regionName}>{dt.regionName}</td>
                <td key={`${dt.name}-100`}>{dt.pingtime}ms</td>
            </tr>
            )}
        </table>

    );
}

export default Table;