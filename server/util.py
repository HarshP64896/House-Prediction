import json
import pickle 
import numpy as np
import warnings
warnings.filterwarnings(action='ignore', category=UserWarning)

__data_columns = None
__locations = None
__model = None

def get_estmiated_price(location,sqft,bath,bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bhk
    x[2] = bath 
    if loc_index>=0:
        x[loc_index] = 1
    return round(__model.predict([x])[0],2)

def get_location_names():
    return __locations

def load_saved_artifcats():
    print("Loading artifacts...start")
    global __data_columns
    global __locations
    global __model

    with open("BHP/server/artifacts/columns.json","r") as f:
        __data_columns =  json.load(f)['data_columns']
        __locations = __data_columns[3:]

    with open("BHP/server/artifacts/banglore_price_predict.pickle","rb") as f:
        __model = pickle.load(f)

    print("Loading artifacts...Done!")

if __name__ == "__main__":
    load_saved_artifcats()
    print(get_location_names())
    print(get_estmiated_price("7th phase jp nagar",1000,2,2))
    print(get_estmiated_price("garudachar palya",2000,3,2))
    print(get_estmiated_price("lingadheeranahalli",1600,2,2))
    print(get_estmiated_price("kothanur",2200,3,2))
    print(get_estmiated_price("9th phase jp nagar",1450,1,1))