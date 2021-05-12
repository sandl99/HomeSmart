import paho.mqtt.client as mqtt
import time
import requests
from home_center import MQTT
############
_mqtt = MQTT(port=1883)
_mqtt.onConnect()


def on_message(client, userdata, message):
    json = message.payload.decode('utf8')
    print(json)
    _mqtt.onPublish(json)


broker_address = "127.0.0.1"
port = 1884
print("creating new instance")
client = mqtt.Client("HomeCenter")
client.on_message = on_message

print("connecting to cloud broker")
client.connect(broker_address, port=port)
print("connected to cloud broker")
# client.loop_start()
time.sleep(4)
client.subscribe("home/led", qos=0)
client.loop_forever()  # Start networking daemon

