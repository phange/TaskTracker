import time
import os
import pandas as pd

if __name__ == '__main__':

    # while loop to allow process to be running waiting for a change
    while True:

        time.sleep(1.0)
        # open datesignal.txt
        csvsignalfile = open("csv-signal.txt", "r")
        # print("opening datesignal.txt...")
        
        # read line to check for request
        line = csvsignalfile.readline()
        # print(line)

        # if request received aka if line in file is "run"
        if line.count("id")>0:
            time.sleep(2)
            
            print("Microservice started!")
            # do microservice task

            # store string of array of objects (?) into line
            # already done from earlier
            
            # delete first and last character in string because they are a single set of brackets []
            json_str = line[1:-1]
            # print(line)

            # convert to CSV
            df = pd.read_json(json_str, lines=True)
            df.to_csv('outputfile.csv')

            # clear csv-signal.txt so it stops
            csvsignalfile = open("csv-signal.txt", "w")
            csvsignalfile.close()
            print("Microservice ended!")

        else:
            pass