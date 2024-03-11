from flask import Flask, jsonify, request
from influxdb_client import InfluxDBClient, Point
from flask_cors import CORS
from flask_mqtt import Mqtt

app = Flask(__name__)
CORS(app)

# app.config['MQTT_BROKER_URL'] = '192.168.1.181'
# app.config['MQTT_BROKER_PORT'] = 1883
# app.config['MQTT_TOPIC'] = 'message'

# mqtt = Mqtt(app)

#Replace these values with your InfluxDB credentials
INFLUXDB_URL = "http://localhost:8086"
INFLUXDB_TOKEN = "PrWGo3Uwa7cL5e0TxB0fvjFlu3hzleBqXLtF_A9Nm6QLRsyMMcBdVe49veHnkhWX5l7Gt62eHZhvoOTGYq1RlQ=="
INFLUXDB_ORG = "SantoshKumar"
INFLUXDB_BUCKET = "farmtemp"
INFLUXDB_BUCKET2 = "farmhumidity"
INFLUXDB_BUCKET3 = "farmsoil"


client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)

@app.route('/', methods=['GET'])
def query_data():
    query = 'from(bucket:"{}") |> range(start: -inf )'.format(INFLUXDB_BUCKET)

    try:
        result = client.query_api().query(query)
        
        # Extract relevant information from FluxTable and convert to a dictionary
        result_dict = []
        for table in result:
            columns = [col.label for col in table.columns]
            measurement_name = columns[0] if columns else 'unknown_measurement'
            table_dict = {
                "columns": columns,
                "name": measurement_name,
                "records": [record.values for record in table.records],
            }
            result_dict.append(table_dict)

        return jsonify(result_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/farmhumidity', methods=['GET'])
def query_temp_data():
    query = 'from(bucket:"{}") |> range(start: -inf)'.format(INFLUXDB_BUCKET2)

    try:
        result = client.query_api().query(query)
        
        # Extract relevant information from FluxTable and convert to a dictionary
        result_dict = []
        for table in result:
            columns = [col.label for col in table.columns]
            measurement_name = columns[0] if columns else 'unknown_measurement'
            table_dict = {
                "columns": columns,
                "name": measurement_name,
                "records": [record.values for record in table.records],
            }
            result_dict.append(table_dict)

        return jsonify(result_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/farmsoil', methods=['GET'])
def query_air_data():
    query = 'from(bucket:"{}") |> range(start: -inf) |> limit(n: 100)'.format(INFLUXDB_BUCKET3)

    try:
        result = client.query_api().query(query)
        
        # Extract relevant information from FluxTable and convert to a dictionary
        result_dict = []
        for table in result:
            columns = [col.label for col in table.columns]
            measurement_name = columns[0] if columns else 'unknown_measurement'
            table_dict = {
                "columns": columns,
                "name": measurement_name,
                "records": [record.values for record in table.records],
            }
            result_dict.append(table_dict)

        return jsonify(result_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/watermotor', methods=['POST'])
def toggle_led():
    try:
        data = request.get_json()
        status = data.get('status', '0')  # Default to '0' if 'status' is not provided

        # Publish the status to the MQTT topic
        mqtt.publish(app.config['MQTT_TOPIC'], status)

        return jsonify({"success": True, "message": f"LED status set to {status}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
@app.route('/alarm', methods=['POST'])
def toggle_alarm():
    try:
        data = request.get_json()
        status = data.get('status', '0')  # Default to '0' if 'status' is not provided

        # Publish the status to the MQTT topic
        mqtt.publish(app.config['MQTT_TOPIC'], status)

        return jsonify({"success": True, "message": f"LED status set to {status}"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)