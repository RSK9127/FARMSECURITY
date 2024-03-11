import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    ReferenceLine,
} from 'recharts';

const TemperatureGraph = () => {
    const [sensorData, setSensorData] = useState([]);

    const fetchData = () => {
        axios.get('http://192.168.43.31:5000/farmhumidity')
            .then(response => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    const dataObject = response.data[0];
                    if (dataObject.records && Array.isArray(dataObject.records)) {
                        const formattedData = dataObject.records.map(record => ({
                            time: new Date(record._time).toLocaleString(),
                            value: record._value
                        }));
                        console.log('Formatted data for chart:', formattedData);
                        setSensorData(formattedData);
                    } else {
                        console.error('Invalid data structure received from Flask - missing records array:', dataObject);
                    }
                } else {
                    console.error('Invalid data structure received from Flask - empty or not an array:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        // Initial fetch
        fetchData();

        // Fetch data every 10 seconds (adjust the interval as needed)
        const intervalId = setInterval(fetchData, 10000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    const axisLabelStyle = {
        fill: 'black',
    };

    return (
        <div style={{ height: 'auto', position: 'relative' }}>
            <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', background: 'linear-gradient(to bottom, #90EE90, #006400)' }}>
                <div style={{ content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
            </div>
            <div>
                <BarChart width={800} height={500} data={sensorData}>
                    <XAxis dataKey="time" tick={axisLabelStyle} />
                    <YAxis dataKey="value" tick={axisLabelStyle} />
                    <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" borderRadius="20px" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255)', border: 'none', borderRadius: '15px', color: 'black' }} />
                    <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
                    <Bar dataKey="value" name='Humidity' fill="rgba(255, 255, 0, 0.8)" barSize={20} />
                    <Brush dataKey="time" height={20} stroke="rgb(22, 38, 183)" fill="rgba(255, 255, 255, 0.3)" borderRadius="20px" />
                    <ReferenceLine x="time" stroke="red" />
                </BarChart>
            </div>
        </div>
    );
};

export default TemperatureGraph;
