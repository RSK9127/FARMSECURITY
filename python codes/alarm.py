import machine
import network
from umqtt.simple import MQTTClient

# Set your WiFi credentials
WIFI_SSID = "Secure P"
WIFI_PASSWORD = "Security@Test"

# Set your MQTT broker details
MQTT_BROKER = "192.168.1.181"
MQTT_PORT = 1883
MQTT_ALARM_TOPIC = b"alarm"

# Set the pin connected to the alarm on the ESP32
ALARM_PIN = 2  # Adjust this based on your ESP32 board

# Callback function to handle incoming MQTT messages
def mqtt_callback(topic, msg):
    try:
        status = int(msg)
        alarm_pin.value(status)  # Set the alarm state based on the received message
        print(f"Received MQTT message for alarm: {msg}")
    except ValueError:
        print("Invalid MQTT message format")

# Connect to WiFi
wifi = network.WLAN(network.STA_IF)
wifi.active(True)
wifi.connect(WIFI_SSID, WIFI_PASSWORD)
while not wifi.isconnected():
    pass
print("Connected to WiFi")

# Initialize the alarm pin
alarm_pin = machine.Pin(ALARM_PIN, machine.Pin.OUT)

# Connect to MQTT broker
mqtt_client = MQTTClient("esp32", MQTT_BROKER, port=MQTT_PORT)
mqtt_client.set_callback(mqtt_callback)
mqtt_client.connect()
mqtt_client.subscribe(MQTT_ALARM_TOPIC)

# Main loop
try:
    while True:
        mqtt_client.wait_msg()
except KeyboardInterrupt:
    pass
finally:
    mqtt_client.disconnect()
    wifi.disconnect()
    print("Disconnected from MQTT and WiFi")
