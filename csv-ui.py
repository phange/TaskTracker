import time
import pandas as pd
import json

def is_json(myjson):
  try:
    json.loads(myjson)
  except ValueError as e:
    return False
  return True

if __name__ == '__main__':

    # while loop to allow process to be running waiting for a change
    while True:

        time.sleep(1.0)
        # open datesignal.txt
        csvsignalfile = open("csv-signal.txt", "r")
        # print("opening datesignal.txt...")
        
        # read line to check for request
        line = csvsignalfile.readline()

        # if request received aka if line in file is "run"
        if line.count("id")>0:
            
            time.sleep(2)

            # check validity of JSON string
            
            if is_json(line) is True:
                print("Microservice Started. JSON string valid.")
            else:
                print("JSON string invalid")
            
            # do microservice task
            time.sleep(1)
            
            # delete first and last character in string because they are a single set of brackets []
            json_str = line[1:-1]

            # convert to CSV
            df = pd.read_json(json_str, lines=True)
            df.to_csv('outputfile.csv')

            # clear csv-signal.txt so it stops
            csvsignalfile = open("csv-signal.txt", "w")
            csvsignalfile.close()
            print("CSV file downloaded to root directory. Microservice ended.")

        else:
            pass