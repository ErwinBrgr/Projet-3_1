/* ------------------------------------------------------------------------------ */
/* --            Compte à rebours et gestion des réservations    -- */
/* ------------------------------------------------------------------------------ */



var CountDownObj  = {
	//properties
	countDownDate : 0, //EDIT : on créer la propriété qui a pour valeur nulle
	//distance : 0, //initialisation de la propriété distance
	minutes : 0,
	seconds: 0,
	//nomStation : null,


	//methods

	//Méthode lancement d'une réservation

	
		


	ct : function(){
		//sessionStorage.setItem("nomStation",CountDownObj.nomStation);
		sessionStorage.setItem("distance", CountDownObj.distance);
		//sessionStorage.setItem("secondes", CountDownObj.seconds);			
	
		var now = new Date().getTime(); //date du jour
		CountDownObj.distance = CountDownObj.countDownDate  - now ;
		CountDownObj.minutes = Math.floor((CountDownObj.distance % (1000 * 60 * 60)) / (1000 * 60));
		CountDownObj.seconds = Math.floor((CountDownObj.distance % (1000 * 60)) / 1000);
		document.getElementById("timer").innerHTML = CountDownObj.minutes + "m " + CountDownObj.seconds + "s "; //affichage minutes et secondes
		//CountDownObj.seconds = sessionStorage.getItem('seconds');
		
		//console.log(CountDownObj.seconds)
		if (CountDownObj.distance < 0) {
            clearInterval(x);
            sessionStorage.clear();
            document.getElementById("timer").innerHTML = "Réservation non valide"; //gestion en cas de session expiré
        }

	},

	timer : function(distance = 1200000 ){
		CountDownObj.countDownDate = new Date().getTime() + parseInt(distance); // EDIT : on initialise le compteur
		x = setInterval(CountDownObj.ct,1000);
		
	}	
};

/*
$('#valid').on('click', function(){
    CountDownObj.timer();
    this.nomStation = sessionStorage.getItem("nomStation");
    CountDownObj.minutes = sessionStorage.getItem('distance');
});*/
