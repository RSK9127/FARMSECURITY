import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/airquality.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';

const AirqualityGraph = () => {
  const [sensorData, setSensorData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const fetchData = () => {
    axios
      .get('http://127.0.0.1:5000/farmsoil')
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const dataObject = response.data[0];
          if (dataObject.records && Array.isArray(dataObject.records)) {
            const formattedData = dataObject.records.map((record) => ({
              time: new Date(record._time).toLocaleString(),
              value: record._value,
            }));
            console.log('Formatted data for chart:', formattedData);
            setSensorData(formattedData);
          } else {
            console.error(
              'Invalid data structure received from Flask - missing records array:',
              dataObject
            );
          }
        } else {
          console.error(
            'Invalid data structure received from Flask - empty or not an array:',
            response.data
          );
        }
      })
      .catch((error) => {
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
    fill: 'white',
  };

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  return (
    <div>
      <div id="airsection">
        <div
          className="background-air"
          style={{ background: 'linear-gradient(to bottom, #90EE90, #006400)' }}
        >
          <div className="chartContainerStyle" data-aos="fade-right">
            <h1 className="heading" data-aos="fade-up">
              Soil Moisture Sensor Data
            </h1>
            <div className="lineChartStyle" data-aos="fade-in">
              <BarChart width={800} height={500} data={sensorData}>
                <XAxis dataKey="time" tick={axisLabelStyle} />
                <YAxis dataKey="value" tick={axisLabelStyle} />
                <CartesianGrid
                  stroke="rgba(255, 255, 255, 0.2)"
                  borderRadius="20px"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255)',
                    border: 'none',
                    borderRadius: '15px',
                    color: 'black',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ color: 'white' }} />
                <Bar
                  dataKey="value"
                  name="soil moisture"
                  fill="#FFA500"
                  barSize={20}
                />
                <ReferenceLine x="time" stroke="red" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
      <button onClick={toggleTable}>Toggle Table</button>
      {showTable && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.map((data, index) => (
                <tr key={index}>
                  <td>{data.time}</td>
                  <td>{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AirqualityGraph;
