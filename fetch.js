let url ="https://api.wheretheiss.at/v1/satellites/25544"

let issLat =document.querySelector("#iss-lat");
let issLong =document.querySelector("#iss-long");
let time= document.querySelector("#time");

let issMarker //leaflet marker
let update = 10000;

let map = L.map("iis-map").setView([0, 0], 1) //center at 0, 0 and max zoom out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',id:'mapbox.streets',accessToken: 'pk.eyJ1IjoiYWRld3V5aWEiLCJhIjoiY2sweTh5MGl2MGM5ejNucGh2bXFqbjg4NiJ9.8puI1Wayy8INZ6mpmogGBA'}).addTo(map)

var icon =L.icon({
    iconUrl: "iss.png",
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})

getData();
setInterval(getData, update);
function getData(){
fetch(url)
    .then(res => res.json())
    .then( issData =>{
        console.log(issData)
        let lat =issData.latitude;
        let long =issData.longitude;
        issLat.innerHTML =lat;
        issLong.innerHTML =long;
        let date = Date()
        time.innerHTML=date;
        if(!issMarker){
            issMarker =L.marker([lat, long], {icon: icon}).addTo(map)
        }
        else
        {
            //Already exists - move to new location
           issMarker.setLangLng([lat, long])
        }
     
    })
    .catch( err =>{
        console.log(err);
    })
}

    
