import speech_recognition as sr
import pyaudio
import wave
from mqtt import MQTT
import time

r = sr.Recognizer()
mqtt = MQTT()
# mqtt = MQTT()
mqtt.onConnect()


def getAudio():
    with sr.Microphone() as source:
        print("Please say something!")
        audio = r.listen(source, phrase_time_limit=5)
    return audio


def play(filename):
    # filename = 'sorry.wav'
    # Set chunk size of 1024 samples per data frame
    chunk = 1024

    # Open the sound file
    wf = wave.open(filename, 'rb')

    # Create an interface to PortAudio
    p = pyaudio.PyAudio()

    # Open a .Stream object to write the WAV file to
    # 'output = True' indicates that the sound will be played rather than recorded
    stream = p.open(format=p.get_format_from_width(wf.getsampwidth()),
                    channels=wf.getnchannels(),
                    rate=wf.getframerate(),
                    output=True)

    # Read data in chunks
    data = wf.readframes(chunk)

    # Play the sound by writing the audio data to the stream
    while len(data) > 0:
        stream.write(data)
        data = wf.readframes(chunk)

    # Close and terminate the stream
    stream.close()
    p.terminate()


def checkOnOff(text):
    if "on" in text and "light" in text:
        return "on"
    if "off" in text and "light" in text:
        return "off"
    return ''


def convert(audio):
    text = ''
    # recognize speech using Google Speech Recognition
    try:
        # for testing purposes, we're just using the default API key
        # to use another API key, use `r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")`
        # instead of `r.recognize_google(audio)`
        text = r.recognize_google(audio)
        print("Google Speech Recognition thinks you said: " + text)
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
    return text.lower()


if __name__ == '__main__':
    print("*** Welcome to Home Assistance ***")
    time.sleep(3)
    while True:
        print("Do you want to say something (y/n) ? ", end='')
        inp = str(input())
        if 'y' in inp:
            play('say.wav')
            audio = getAudio()
            print("listen successfully")
            text = convert(audio)
            status = checkOnOff(text)
            if status == '':
                play('sorry.wav')
            else:
                mqtt.onPublish(status)
        else:
            break
    mqtt.stop()


