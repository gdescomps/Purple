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

function deckAleatoire(){
    url="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    get(url, 'nouveauDeck');
    afficherDeck(reponse);
    //majScore(0);
    
}

function comparerValeurCarte(choix){

tirerCarte();

var comparaison="egalite";

var srcImagePrincipale=document.getElementById("cartePrincipale").src;
var srcImageSecondaire=document.getElementById("carteSecondaire").src;

var valeurImagePrincipale= srcImagePrincipale[srcImagePrincipale.length-6];
var valeurImageSecondaire= srcImageSecondaire[srcImageSecondaire.length-6];

var valeurNumeriqueImagePrincipale=0;
var valeurNumeriqueImageSecondaire=0;


while(tableauValeur[valeurNumeriqueImagePrincipale]!==valeurImagePrincipale)
{
    valeurNumeriqueImagePrincipale++;
}

while(tableauValeur[valeurNumeriqueImageSecondaire]!==valeurImageSecondaire)
{
    valeurNumeriqueImageSecondaire++;
}

if (valeurNumeriqueImageSecondaire>valeurNumeriqueImagePrincipale) comparaison="plus";
else if (valeurNumeriqueImageSecondaire<valeurNumeriqueImagePrincipale) comparaison="moins";

if (choix!=comparaison) deckAleatoire();


}

function rougeNoireOuPurple(choix){

    tirerCarte();


    if (choix=="purple"){}

    else {
        var srcImagePrincipale=document.getElementById("cartePrincipale").src;
        var couleurImagePrincipale= srcImagePrincipale[srcImagePrincipale.length-5];
       
        if (couleurImagePrincipale=="H"||couleurImagePrincipale=="D"){couleurImagePrincipale="rouge";}
        else {couleurImagePrincipale="noire";}

        if (choix!=couleurImagePrincipale) deckAleatoire();
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
    var newP = document.createElement("p");
    deckId=response.deck_id;
    newP.appendChild(document.createTextNode("Deck : " + deckId));
    document.getElementById("content").appendChild(newP);

    majScore(0);
}

function afficherNouvelleCarte(response){
    var imagePrincipale=document.getElementById("cartePrincipale");
    var imageSecondaire=document.getElementById("carteSecondaire");

    imageSecondaire.setAttribute("src",imagePrincipale.src) ;
    var nouvelleCarte=response["cards"]["0"]["images"]["png"];
    imagePrincipale.setAttribute("src", nouvelleCarte);

    majScore(score+1);
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
        document.getElementById("plus").addEventListener("click", function() {comparerValeurCarte("plus");}); 
        document.getElementById("moins").addEventListener("click", function() {comparerValeurCarte("moins");});

        document.getElementById("rouge").addEventListener("click", function() {rougeNoireOuPurple("rouge");}); 
        document.getElementById("noire").addEventListener("click", function() {rougeNoireOuPurple("noire");});
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