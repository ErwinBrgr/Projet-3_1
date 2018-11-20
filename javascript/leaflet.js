var mymap = L.map('mapid').setView([49.443232, 1.099971], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXJ3aW5icmdyIiwiYSI6ImNqbnQ1czl6cTBvYWEzcHBqOXBkMDB2bzcifQ.YfJ2wPJux8VPSoLBbXMgLA'
}).addTo(mymap);

var token = "43ca35bbc25b63d176479f8846a2026bb7f0175f";
var urlapi = "https://api.jcdecaux.com/vls/v1/stations?contract=Rouen&apiKey="+token ;

ajaxGet(urlapi, function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var stations = JSON.parse(reponse);
    console.log(stations);
    var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [1, 1],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

    var greenIcon = new LeafIcon({iconUrl: './images/marker_green.png'}),
    redIcon = new LeafIcon({iconUrl: './images/marker_red.png'}),
    orangeIcon = new LeafIcon({iconUrl: './images/marker_orange.png'});

    L.icon = function (options) {
    return new L.Icon(options);
};


//Insertion des markers sur la carte
    stations.forEach(function (station) {
          //Méthode pour mise en forme des noms des stations
         
            var tableau_name = station.name.split("-");
          	var station_name = tableau_name[1] ;

         //Choix des markers selons statuts des stations et nombres de vélos présents dans la station

        if (station.available_bikes >= 5) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: greenIcon}).addTo(mymap);
         }
        else if(station.status = "OPEN" && station.available_bikes <= 4 ) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: orangeIcon}).addTo(mymap);
        }else if (station.available_bikes === 0) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: redIcon}).addTo(mymap);
        }
        else {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: redIcon}).addTo(mymap);
        };
  		
  		//Méthode d'insertion des informations dans div infoStation

		displayPanel = function(){
		$("#mapid").width("70%");
		$("#infoStation").show();	
		$("#nomStation").html(station.name);
		$("#etatStation").html(station.status);
		$("#veloDispo").html(station.available_bikes);
		$("#attacheDispo").html(station.available_bike_stands);

		};

marker.on('click', displayPanel);
});

//Création d'un décompte
var cpt = 10 ;
var x ;
 
function decompte(cpt)
{
    if(cpt>=0)
    {
        if(cpt>1)
        {
            var sec = " secondes.";
        } else {
            var sec = " seconde.";
        }
        $("#timer").html = "Redirection dans " + cpt + sec ;
        cpt-- ;
        x = setTimeout(decompte(),1000) ;
    }
    else
    {
        clearTimeout(x) ;
    }

};



   var btnValid = $('#validationCanvas');
        afficheInfo = function(){
        $("#selectionStation").show();
        //$("#selectionStation").html("Vous avez séléctionné la station "+ $("#nomStation").text() + " réservation valide pendant : ");
        decompte(1000);
        };

      btnValid.on('click',afficheInfo);
    });



 

