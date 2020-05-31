import React, { useState, useEffect } from 'react';
import TreeChart from './TreeChart';

const initialData = {
    name : "model",
    children: [
        {
            name: "sample1",
            children: [
                // {
                //     name: "test1"
                // },
                {
                    name: "test2"
                },
                {
                    name: "https://codepen.io/onconconconconconnconconconnconconconc."
                }
            ]
        },
        {
            name: "sample2"
        },
        {
            name: "sample3"
        }
    ]
};

const TreeApp = () => {
    const [data, setData] = useState(initialData);
    useEffect(() => {
        console.log(data)
    }, [data]);
    return (
        <div>
            <TreeChart data={data} />
            <button onClick={() => setData(initialData.children[0])}>update data</button>
        </div>
    );
};

export default TreeApp;