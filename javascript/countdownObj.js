var countDownObj  = {
	//properties 
countDownDate : new Date().getTime() + 20*60*1000, //date du jour + 20 minutes
distance : 0, //initialisation de la propriété distance
	
	//methods

ct : function(){


		var now = new Date().getTime(); //date du jour
		countDownObj.distance= countDownObj.countDownDate - now ; 
		var minutes = Math.floor((countDownObj.distance % (1000 * 60 * 60)) / (1000 * 60)); 
		var seconds = Math.floor((countDownObj.distance % (1000 * 60)) / 1000);
		document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s "; //affichage minutes et secondes

		
		},
};

var x = $("#valid").on('click',setInterval(function(){
	countDownObj.ct() //appel à la fonction ct à l'interieur de l'objet
		 if (countDownObj.distance < 0) {
	    clearInterval(x);
	    document.getElementById("timer").innerHTML = "Réservation non valide"; //gestion en cas de session expiré
		}
},1000));

