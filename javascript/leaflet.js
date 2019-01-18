var mymap = L.map('mapid').setView([43.300000, 5.400000], 15); // stockage carte dans div avec gestion de la position dans la ville de Rouen

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZXJ3aW5icmdyIiwiYSI6ImNqbnQ1czl6cTBvYWEzcHBqOXBkMDB2bzcifQ.YfJ2wPJux8VPSoLBbXMgLA'
}).addTo(mymap);

var token = "43ca35bbc25b63d176479f8846a2026bb7f0175f";
var urlapi = "https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey="+token ;

ajaxGet(urlapi, function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var stations = JSON.parse(reponse);
    console.log(stations);
    var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [50, 50], //taille de l'icône
        shadowSize:   [50, 64], //ombre porté (à suppr pdt test)
        iconAnchor:   [0, 50], //ancrage de l'icône
        shadowAnchor: [4, 62],//ancrage de l'ombre (à suppr pdt test)
        popupAnchor:  [10, 10] //gestion pop plus d'actualité, à supprim après test
    }
});
 //création de variables pour stackage des 3 différentes icônes (verte, orange, rouge)
    var greenIcon = new LeafIcon({iconUrl: './images/green_icon.png'}),
    redIcon = new LeafIcon({iconUrl: './images/red_icon.png'}),
    orangeIcon = new LeafIcon({iconUrl: './images/orange_icon.png'});

    L.icon = function (options) {
    return new L.Icon(options);
};

    var markers = new L.MarkerClusterGroup();



//Insertion des markers sur la carte
    stations.forEach(function (station) {
          //Méthode pour mise en forme des noms des stations (à retravailler)

            var tableau_name = station.name.split("-"); //
          	var station_name = tableau_name[1] ;

         //Choix des markers selons statuts des stations et nombres de vélos présents dans la station



            //condition pour couleur du marker. si nb vélo sup à 5 afichage du markeur en vert
        if (station.available_bikes >= 5) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: greenIcon});
         }//idement mais affichage en orange
        else if(station.status = "OPEN" && station.available_bikes <= 4 ) {
        var marker =L.marker([station.position.lat, station.position.lng], {icon: orangeIcon});
        }else if (station.available_bikes === 0) { //si 0 marker eu rouge
        var marker =L.marker([station.position.lat, station.position.lng], {icon: redIcon});
        }
        else { //si aucune conditon remplie : rouge
        var marker =L.marker([station.position.lat, station.position.lng], {icon: redIcon});
        };



        markers.addLayer(marker);
// add more markers here...



  		//Méthode d'insertion des informations dans div infoStation

        displayPanel = function(){
        $("#mapid").width("70%"); //changement de la largeur de carte pour 70% de la taille de la page
        $("#infoStation").show(); //affichage div en display none par défault
        $("#nomStation").html(station.name); //affichage du nom de la station
        $("#etatStation").html(station.status); //affichage statut open ou close de la station
        $("#veloDispo").html(station.available_bikes); //affichage de nombre de de vélos disponible
        $("#attacheDispo").html(station.available_bike_stands); //affichage du nombre d'attache dispo

        };



marker.on('click', displayPanel); //gestion du click sur le marker pour affichage des informations (via fonction display)

    }); // Fin for Each

mymap.addLayer(markers);
});

        valid = function () {
            sessionStorage.setItem("nomStation", $("#nomStation").html());
        
            var name = $("#Formnom").val();
            var missPrenom = document.getElementById("missPrenom");
            if($.trim(name) === ''){
                missPrenom.textContent = "Prénom manquant";
                missPrenom.style.color ='red';

                return false;
            }else{
                sessionStorage.setItem("Formprenom", $("#Formprenom").val());
                sessionStorage.setItem("Formnom", $("#Formnom").val());
                 $('#selectionStation').html("Réservation à la station " 
                + sessionStorage.getItem("nomStation") + " pour " + sessionStorage.getItem("Formprenom") 
                +" " 
                + sessionStorage.getItem("Formnom"));

                 return true;
            }

        };

$(function() {
    //On vérifie l'existence d'une variable de session
    if(sessionStorage.getItem("nomStation") == null) {
        //console.log("Pas de résa");
    } else {
            //console.log("il y a une résa " + sessionStorage.getItem("nomStation"));
            $("#selesctionStation").html("<p>Réservation à la station</p> " + sessionStorage.getItem("nomStation")
                +" pour " + sessionStorage.getItem("Formprenom") 
                +" " 
                + sessionStorage.getItem("Formnom"));
            //console.log(sessionStorage.getItem("distance"));
            CountDownObj.timer(sessionStorage.getItem("distance"));
    }

            $("#clearCanvasSimple").on('click', function(){
                console.log(sessionStorage.getItem("nomStation"));
                sessionStorage.clear();
                console.log(sessionStorage.getItem("nomStation"));
            });

  $('#signUp').click(function(){
       $('.hover_bkgr_fricc').show();
    });
   
    $('#valid').click(function(){
       
       if( valid() ){
            CountDownObj.timer();
            $('.hover_bkgr_fricc').html('<p>Réservation prise en compte !</p>');
            $('.hover_bkgr_fricc').fadeOut(3000, function() {
            // Animation complete.
            });

       }
        
       
    });

    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });

});