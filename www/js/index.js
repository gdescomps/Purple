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

function deckAleatoire(){
    //alert("test");
    get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");

}

function carteAleatoire(){
    //alert("test");
 
    var request = new XMLHttpRequest();
    request.open("GET", "https://deckofcardsapi.com/api/deck/"+deckId+"/draw/?count=2", true);
    // .................................
    request.onreadystatechange = function (aEvt) {
        // .................................
        if (request.readyState == 4) {
            if (request.status == 200) {
               var response = JSON.parse(request.responseText);
                 var imagePrincipale=document.getElementById("imagePrincipale");
                 var imageSecondaire=document.getElementById("imageSecondaire");
                 imageSecondaire.setAttribute("src",imagePrincipale.src) ;
                 var newsrc=response["cards"]["0"]["images"]["png"];
                  imagePrincipale.setAttribute("src",newsrc);
            }
            else {  // .................................
                console.log("Error : " + request.responseText);
            }
        }
    };
    request.send(null);

}

function get(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    // .................................
    request.onreadystatechange = function (aEvt) {
        // .................................
        if (request.readyState == 4) {
            if (request.status == 200) {
               onWebserviceSuccess(JSON.parse(request.responseText));
            }
            else {  // .................................
                console.log("Error : " + request.responseText);
            }
        }
    };
    request.send(null);
   
}


var deckId;
function onWebserviceSuccess(response) {
  
    var newP = document.createElement("p");
    deckId=response.deck_id;
    newP.appendChild(document.createTextNode("Deck : " + deckId));
    document.getElementById("content").appendChild(newP);
    
    
}



var app = {
    // Application Constructor
    initialize: function() {
       document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');
        document.addEventListener("deviceready", deckAleatoire, false);
        document.getElementById("melanger").addEventListener("click", deckAleatoire );
        document.getElementById("imagePrincipale").addEventListener("click", carteAleatoire );
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