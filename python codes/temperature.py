from umqtt.simple import MQTTClient
import machine
import time
import dht

# Set your WiFi credentials
WIFI_SSID = "Your_WiFi_SSID"
WIFI_PASSWORD = "Your_WiFi_Password"

# Set your MQTT broker details
MQTT_BROKER = "192.168.1.181"  # Replace with your MQTT broker's IP address
MQTT_PORT = 1883
MQTT_TOPIC_TEMPERATURE = b"temperature"
MQTT_TOPIC_HUMIDITY = b"humidity"

# Set the pin connected to the DHT sensor on the ESP32
DHT_PIN = 4  # Adjust this based on your ESP32 board

# Connect to WiFi
wifi = network.WLAN(network.STA_IF)
wifi.active(True)
wifi.connect(WIFI_SSID, WIFI_PASSWORD)
while not wifi.isconnected():
    pass
print("Connected to WiFi")

# Initialize the DHT sensor
dht_sensor = dht.DHT22(machine.Pin(DHT_PIN))

# Connect to MQTT broker
mqtt_client = MQTTClient("esp32", MQTT_BROKER, port=MQTT_PORT)
mqtt_client.connect()

# Main loop
try:
    while True:
        # Read temperature and humidity data
        dht_sensor.measure()
        temperature = dht_sensor.temperature()
        humidity = dht_sensor.humidity()
        
        # Publish temperature data
        mqtt_client.publish(MQTT_TOPIC_TEMPERATURE, str(temperature))
        print("Temperature published:", temperature)
        
        # Publish humidity data
        mqtt_client.publish(MQTT_TOPIC_HUMIDITY, str(humidity))
        print("Humidity published:", humidity)
        
        # Wait for a few seconds before reading again
        time.sleep(10)
except KeyboardInterrupt:
    pass
finally:
    mqtt_client.disconnect()
    wifi.disconnect()
    print("Disconnected from MQTT and WiFi")
