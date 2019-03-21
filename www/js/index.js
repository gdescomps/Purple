/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var deckId;
var score=0;
var tableauValeur= ["2","3","4","5","6","7","8","9","0","J","Q","K","A"];

var cartePrincipale="KH";
var carteSecondaire="AH";

var deuxCartesTires=1;

var choix;

function deckAleatoire(){
    choix="perdu";
    var imagePrincipale=document.getElementById("cartePrincipale");

    imagePrincipale.setAttribute("src","img/carteDos.png") ;
    url="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    get(url, 'nouveauDeck');
    afficherDeck(reponse);
    

    //majScore(0);
    
}

function traiterChoixJoueurEtTirerUneCarte(choixJoueur){

    choix=choixJoueur;
    tirerCarte();
}

function comparerValeurCartes(){


if(choix=="plus"||choix=="moins"){
var comparaison="egalite";

var valeurImageSecondaire= carteSecondaire[0];
var valeurImagePrincipale= cartePrincipale[0];
var valeurNumeriqueImagePrincipale=0;
var valeurNumeriqueImageSecondaire=0;

while(tableauValeur[valeurNumeriqueImageSecondaire]!==valeurImageSecondaire)
{
    valeurNumeriqueImageSecondaire++;
}

while(tableauValeur[valeurNumeriqueImagePrincipale]!==cartePrincipale[0])
{
    valeurNumeriqueImagePrincipale++;
}



if (valeurNumeriqueImageSecondaire>valeurNumeriqueImagePrincipale) comparaison="moins";
else if (valeurNumeriqueImageSecondaire<valeurNumeriqueImagePrincipale) comparaison="plus";

if (choix!=comparaison) deckAleatoire();

}
else if (choix=="rouge"||choix=="noire"){

        var couleurImagePrincipale= cartePrincipale[1];
       
        if (couleurImagePrincipale=="H"||couleurImagePrincipale=="D"){couleurImagePrincipale="rouge";}
        else {couleurImagePrincipale="noire";}

        if (choix!=couleurImagePrincipale) deckAleatoire();
}
else if (choix=="purple")
{
    if(deuxCartesTires==2){

        var couleurImagePrincipale= cartePrincipale[1];
        var couleurImageSecondaire= carteSecondaire[1];

        if (couleurImagePrincipale=="H"||couleurImagePrincipale=="D"){couleurImagePrincipale="rouge";}
        else {couleurImagePrincipale="noire";}

        if (couleurImageSecondaire=="H"||couleurImageSecondaire=="D"){couleurImageSecondaire="rouge";}
        else {couleurImageSecondaire="noire";}

        if (couleurImagePrincipale=="noire"&&couleurImageSecondaire=="noire") deckAleatoire();
        else if (couleurImagePrincipale=="rouge"&&couleurImageSecondaire=="rouge") deckAleatoire();

        deuxCartesTires=1;
    }
    else {
        tirerCarte();
        deuxCartesTires++;
    }
}

}

function tirerCarte(){
    url="https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count=1";
    get(url, 'tirerCarte');
    //var reponse = get(url, 'tirerCarte');
   // afficherNouvelleCarte(reponse);
}

function get(url, action){
    
    var request = new XMLHttpRequest();
    request.open("GET", url, true);

    // Lors d'un changement d'état de la requête
    request.onreadystatechange = function (aEvt) {
        // Si une réponse a été reçue
        if (request.readyState == 4) {
            if (request.status == 200) {
                switch(action){
                    case 'nouveauDeck':
                        afficherDeck(JSON.parse(request.responseText));
                        break;
                    case 'tirerCarte':
                        afficherNouvelleCarte(JSON.parse(request.responseText));
                        break;
                }
            }
            else {  // Sinon afficher l'erreur
                console.log("Error : " + request.responseText);
            }
        }
    };
    request.send(null);
}

function afficherDeck(response) {
    
    deckId=response.deck_id;

    document.getElementById("content").innerHTML="Gorgées à boire : " + score;

    majScore(0);

    tirerCarte();

    var imageSecondaire=document.getElementById("carteSecondaire");

    imageSecondaire.setAttribute("src","img/carteDos.png") ;
}

function afficherNouvelleCarte(response){
    carteSecondaire=cartePrincipale;
    cartePrincipale=response["cards"]["0"]["code"];
    var imagePrincipale=document.getElementById("cartePrincipale");
    var imageSecondaire=document.getElementById("carteSecondaire");

    imageSecondaire.setAttribute("src",imagePrincipale.src) ;
    var nouvelleCarte=response["cards"]["0"]["images"]["png"];
    imagePrincipale.setAttribute("src", nouvelleCarte);


    majScore(score+1);
    comparerValeurCartes();
}

function majScore(val){
    score=val;
    document.getElementById("pScore").innerHTML=score;
   
}



var app = {
    // Application Constructor
    initialize: function() {
       document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
       document.addEventListener("deviceready", deckAleatoire, false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.

onDeviceReady: function() {
        //this.receivedEvent('deviceready');
        document.getElementById("plus").addEventListener("click", function() {traiterChoixJoueurEtTirerUneCarte("plus");}); 
        document.getElementById("moins").addEventListener("click", function() {traiterChoixJoueurEtTirerUneCarte("moins");});

        document.getElementById("rouge").addEventListener("click", function() {traiterChoixJoueurEtTirerUneCarte("rouge");}); 
        document.getElementById("noire").addEventListener("click", function() {traiterChoixJoueurEtTirerUneCarte("noire");});
        document.getElementById("purple").addEventListener("click", function() {traiterChoixJoueurEtTirerUneCarte("purple");});
        document.getElementById("cartePrincipale").addEventListener("click", tirerCarte );
},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
    }
};

app.initialize();