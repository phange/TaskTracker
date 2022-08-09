import json
import time
import _json

from numpy import array
while True:

    time.sleep(1.0)
    f = open("signal.txt", "r")
    result = f.readline()
    if result.count("id")> 1 :
        count = result.count("id")
        count = ("The amount of tasks you currently have: " + str(count))
        print(count)
        
    if len(result) > 1 :#"run\n"
        f.close()
        f = open('signal.txt', "w")
        f.write(count)
    
    f.close()