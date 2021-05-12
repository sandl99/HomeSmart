import paho.mqtt.client as mqtt
import time
import requests

############
url = 'http://127.0.0.1:3000/api/v1/sensor/data'
queue = []


def on_message(client, userdata, message):
    json = {'sensorID': 1, 'value': message.payload.decode("utf-8"), 'createdAt':  round(time.time() * 1000)}
    queue.append(json)
    print('No queue:= ', end='')
    try:
        while len(queue) > 0:
            # print(queue[0])

            print(queue.pop(0))
            time.sleep(0.5)
    except requests.ConnectionError:
        print(f'~~ Length of Queue = {len(queue)} || 404 Server disconnected')


broker_address = "127.0.0.1"

print("creating new instance")
client = mqtt.Client("Sensor")
client.on_message = on_message

print("connecting to broker")
client.connect(broker_address, port=1883)
print("connected to broker")
# client.loop_start()
time.sleep(1)
client.subscribe("home/sensor", qos=0)
client.loop_forever()  # Start networking daemon

