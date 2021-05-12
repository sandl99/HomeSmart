/*
    This sketch establishes a TCP connection to a "quote of the day" service.
    It sends a "hello" message, and then prints received data.
*/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#ifndef STASSID
#define STASSID "AndroidAP9E25"
#define STAPSK  "12011999"
#endif

#define D0 16
#define D1 5
#define D2 4


// GPIO where the DS18B20 is connected to
const int oneWireBus = 5;     

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

const char* ssid     = STASSID;
const char* password = STAPSK;

const char* host = "djxmmx.net";
const uint16_t port = 17;

const char* mqtt_server = "192.168.43.210";
long lastMsg = 0;

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long previousMillis = 0;
const long interval = 1000;
int ledState;

void setupForLed() {
  pinMode(D0, OUTPUT);
//  pinMode(D1, OUTPUT);
  pinMode(D2, OUTPUT);
}

void turnOnLed() {
  digitalWrite(D2, LOW);
  digitalWrite(D0, HIGH);
  delay(1000);
  digitalWrite(D0, LOW);
//  digitalWrite(D1, HIGH);
  delay(1000);
//  digitalWrite(D1, LOW);
  digitalWrite(D2, HIGH);
  delay(1000);
}
void turnOnFull() {
  digitalWrite(D0, HIGH);
//  digitalWrite(D1, HIGH);
  digitalWrite(D2, HIGH);
}
void turnOffLed() {
  digitalWrite(D0, LOW);
//  digitalWrite(D1, LOW);
  digitalWrite(D2, LOW);
}

void connectWiFi() {
  // We start by connecting to a WiFi network

  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
     would try to act as both a client and an access-point and could cause
     network-issues with your other WiFi-devices on your WiFi-network. */
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  WiFi.setAutoConnect(1);
  
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  setupForLed();
  Serial.begin(115200);
  connectWiFi();
  turnOnLed();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  sensors.begin();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    /*
     YOU MIGHT NEED TO CHANGE THIS LINE, IF YOU'RE HAVING PROBLEMS WITH MQTT MULTIPLE CONNECTIONS
     To change the ESP device ID, you will have to give a new name to the ESP8266.
     Here's how it looks:
       if (client.connect("ESP8266Client")) {
     You can do it like this:
       if (client.connect("ESP1_Office")) {
     Then, for the other ESP:
       if (client.connect("ESP2_Garage")) {
      That should solve your MQTT multiple connections problem
    */
    if (client.connect("ESP8266Client")) {
      Serial.println("connected");  
      // Subscribe or resubscribe to a topic
      // You can subscribe to more topics (to control more LEDs in this example)
      client.subscribe("home/led");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

// This functions is executed when some device publishes a message to a topic that your ESP8266 is subscribed to
// Change the function below to add logic to your program, so when a device publishes a message to a topic that 
// your ESP8266 is subscribed you can actually do something
void callback(String topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic room/lamp, you check if the message is either on or off. Turns the lamp GPIO according to the message
  if(topic=="home/led"){
      Serial.print("Turn on LED to ");
      if(messageTemp == "on"){
//       while(1) {
        turnOnFull();
//       }
        Serial.print("On");
      }
      else if(messageTemp == "off"){
        turnOffLed();
        Serial.print("Off");
      }
  }
  Serial.println();
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  if(!client.loop())
    client.connect("ESP8266Client");
  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;

    sensors.requestTemperatures(); 
    float temperatureC = sensors.getTempCByIndex(0);
    Serial.print(temperatureC);
    Serial.println("ºC");

    char tempString[8];
    dtostrf(temperatureC, 1, 2, tempString);
    client.publish((const char *)"home/sensor", tempString);
  }
}
