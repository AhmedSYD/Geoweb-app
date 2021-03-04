from flask import Flask, render_template, request
import requests
import datetime

app=Flask(__name__)


@app.route("/")
def search():
    return render_template("building_permit_search.html", geocode="", date_value="01/01/2020 - 01/15/2020", initial_page=True)

@app.route("/search", methods=["POST"]) 
def after_searching():
    js_data=""
    dateRange="01/01/2020 - 01/15/2020"
    dateRange=request.form.get("daterange")
    dates=dateRange.split("-")
    start_date,end_date=dates[0].strip(),dates[1].strip()
    start_date_format="'"+str(datetime.datetime.strptime(start_date, '%m/%d/%Y').date())+"'"
    end_date_format="'"+str(datetime.datetime.strptime(end_date, '%m/%d/%Y').date())+"'"
    print("start date:",start_date_format)
    print("end date:",end_date_format)
    res = requests.get("https://data.calgary.ca/resource/c2es-76ed.geojson",\
        params={"$where": "issueddate > "+start_date_format+" and issueddate < "+end_date_format})
                # "$select":"issueddate, workclassgroup, contractorname, communityname, originaladdress,latitude,longitude"})
    # print("status code=", res.status_code)
    # print("data=", res.json())
    
    if res.status_code==200:
        js_data=res.json()
    else:
        js_data= {}
    return js_data
        
    
    # return render_template("building_permit_search.html",geocode=js_data,date_value=dateRange, initial_page=False)

if __name__== "__main__" :
    app.run(debug=True)