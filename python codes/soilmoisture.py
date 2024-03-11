from machine import Pin, ADC
import time
from umqtt.simple import MQTTClient

# Set your WiFi credentials
WIFI_SSID = "Your_WiFi_SSID"
WIFI_PASSWORD = "Your_WiFi_Password"

# Set your MQTT broker details
MQTT_BROKER = "192.168.1.181"  # Replace with your MQTT broker's IP address
MQTT_PORT = 1883
MQTT_TOPIC_SOIL_MOISTURE = b"soil_moisture"

# Define the pin connected to the soil moisture sensor
moisture_sensor_pin = 34  # Example pin number, adjust as needed

# Create an ADC object
adc = ADC(Pin(moisture_sensor_pin))

# Connect to WiFi
wifi = network.WLAN(network.STA_IF)
wifi.active(True)
wifi.connect(WIFI_SSID, WIFI_PASSWORD)
while not wifi.isconnected():
    pass
print("Connected to WiFi")

# Define a function to read soil moisture level
def read_soil_moisture():
    # Read analog value from the sensor
    moisture_value = adc.read()

    # Map the analog value to a moisture percentage (adjust according to your sensor)
    moisture_percentage = ((moisture_value - 0) / (1024 - 0)) * 100

    return moisture_percentage

# Connect to MQTT broker
mqtt_client = MQTTClient("esp32", MQTT_BROKER, port=MQTT_PORT)
mqtt_client.connect()

# Main loop
try:
    while True:
        # Read soil moisture level
        moisture_percentage = read_soil_moisture()
        print("Soil moisture: {}%".format(int(moisture_percentage)))

        # Publish soil moisture data
        mqtt_client.publish(MQTT_TOPIC_SOIL_MOISTURE, str(moisture_percentage))
        print("Soil moisture data published")

        # Wait for some time before taking the next reading
        time.sleep(10)
except KeyboardInterrupt:
    pass
finally:
    mqtt_client.disconnect()
    wifi.disconnect()
    print("Disconnected from MQTT and WiFi")
