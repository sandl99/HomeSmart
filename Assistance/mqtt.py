import paho.mqtt.client as paho
import time


def on_connect(client, userdata, flag, rc):
    if rc == 0:
        print("Connected OK")
    else:
        print("Failed to connect. Error code: " + str(rc))


def on_log(client, userdata, level, buf):
    print("log: " + str(buf))


# def on_publish(client, userdata, mid):
#     print("Published with code: " + str(mid))


def on_disconnect(client, userdata, flag, rc=0):
    print("disconnected with result code: " + str(rc))


class MQTT:
    def __init__(self, broker="127.0.0.1", port=1883):
        self.broker = broker
        self.port = port
        self.client = paho.Client("Assistance")
        self.client.on_log = on_log
        self.client.on_connect = on_connect
        # self.client.on_publish = on_publish
        self.client.on_disconnect = on_disconnect

    def onConnect(self):
        self.client.connect(host=self.broker, port=self.port)
        self.client.loop_start()
        # self.client.loop_forever()

    def onPublish(self, message):
        assert message == "on" or message == "off"
        self.client.publish("home/led", message)

    def stop(self):
        self.client.loop_stop()
        self.client.disconnect()


if __name__ == '__main__':
    mqtt = MQTT()
    mqtt.onConnect()
    time.sleep(4)
    mqtt.onPublish("on")
