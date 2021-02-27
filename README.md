# Project2: GeoWeb APP

ENGO 551 - Adv. Topics on Geospatial Technologies

## Overview:
This website is an assignment for the 3rd (Adv. Topics on Geospatial Technologies). I created a web mapping application for building permits in Calgary, Canada, which is taken from the Open Calgary API dataset. Users can find all building permits on the map by selecting the issue date range they like. Moreover, some useful information, such as contractor name and community name, of any building permit exists on the pop content of the marker that represents this building permit. To make the map visually appealing, I handled the problem of overlapping markers and made a cluster of the neighboring markers on the map.   

## System requirement:
- Any platform you like such as Windows, Linux, and so on. 
- use any browsers (Firefox, Google Chrome,...) to display the html pages. 
- python 3.6 or higher

## Libraries required to install:
- Flask 
- requests
You can find both libraries in the `requirements.txt` and install them by running this command `pip3 install -r requirements.txt` in the terminal window.

## Tools used:
- HTML 5
- CSS
- python flask 
- Javascript
- Leeflet
- GeoJSON
- Open Calgary API dataset

## How to use the webpage:
* After installing all libraries required in your evironment, run `application.py` in any IDE you like.
* You will find a line in the console `Running on <server link>` where `<server link>` is the link of the server of flask is working on. In my case, the server link is `http://127.0.0.1:5000/`. 
* Copy the server link and paste it in the link box of any browser you like to go the website.

![geoweb_first](https://user-images.githubusercontent.com/26576895/109386236-08d4ee80-7902-11eb-98a7-c07aff6c7255.JPG)

* Looking closely at the image above, you can see a map of the city of Calgary. aboving it, a search box is located that is utliized to search for building permits by date range. 
* Choose any date range you want from the date range picker widget, then, click on **Apply** button on this widget. After that, Click on **Search** button, as you see below.

![search](https://user-images.githubusercontent.com/26576895/109386591-476ba880-7904-11eb-99f0-56a40fe3e6b4.JPG)

* After seaching, you will find markers and clusters of building permits in Calgary, where a marker reperesents a single building permit, but the cluster represent the group of the neighboring markers (building permits).

![after_searching](https://user-images.githubusercontent.com/26576895/109386784-d4633180-7905-11eb-991e-0edbccbb7fbc.JPG)

* By clicking on any cluster, the map will zoom in automatically to get the neighboring markers or other clusters. if you click on any new cluster that is created, the map will zoom in to get other markers and cluster and so on till you get your desired marker. 
* If you click on any marker, you will get the popcontent message that includes all information about `issueddate`, `workclassgroup`, `contractorname`, `communityname` and `originaladdress`, as you see below.

![popcontent](https://user-images.githubusercontent.com/26576895/109387046-8e0ed200-7907-11eb-8677-23f57ff4727a.JPG)

* Sometimes, some markers are overlapping, i.e., multiple building permits located at the same location. Therefore, I handled it by using Leaflet Plug-in, in which all overlapping markers are integrated together in a single marker and if you click on this marker, you will get all overlapping markers inside it, as you see in the image below. 

![overlapping_markers](https://user-images.githubusercontent.com/26576895/109388432-a8e54480-790f-11eb-9e23-a04ece1e500d.JPG)

* Finally, if you'd like to get another building permits in another date range, choose the new date range and click on **search** again and you will find that the map is refreshed and display the new matching result.

## what’s contained in each file:
- `application.py`:
- 







