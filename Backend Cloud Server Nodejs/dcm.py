import os

user_input = input('What is the name of your directory')
directory = os.listdir(user_input)

searchstring = input('What word are you trying to find?')

for fname in directory:
    if os.path.isfile(user_input + os.sep + fname):
        # Full path
        f = open(user_input + os.sep + fname, 'r')

        if searchstring in f.read():
            print('found string in file %s' % fname)
        else:
            print('string not found')
        f.close()
