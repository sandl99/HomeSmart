import paho.mqtt.client as mqtt
import time
import requests

############
url = 'http://127.0.0.1:3000/api/v1/device/setStatus'
queue = []
status = "on"


def on_message(client, userdata, message):
    global status
    print(message.payload)
    if message.payload.decode('utf8') == "on":
        json = {"_id": 1, "userID": 1, "status": 1}
    else:
        json = {"_id": 1, "userID": 1, "status": 0}
    try:
        if status != message.payload.decode('utf8'):
            requests.put(url, json=json)
            status = message.payload.decode('utf8')
    except requests.ConnectionError:
        print('404 Server disconnected')


broker_address = "127.0.0.1"

print("creating new instance")
client = mqtt.Client("P1")
client.on_message = on_message

print("connecting to broker")
client.connect(broker_address, port=1883)
print("connected to broker")
# client.loop_start()
time.sleep(4)
client.subscribe("home/led", qos=0)
client.loop_forever()  # Start networking daemon