/*State and React to keep track of variables?*/
/* Connection to Firebase Database */
Firebase firebaseRef = new Firebase(URLToOurFirebase);

function buildFirstRow(numOfStudyDecks) {
    document.getElementById("table").innerHTML += "<tr>";
    //builds button
    //insert plus shape with no background and use image mapping to have coordinates from whole block? Will this work consistently?
    document.getElementById("table").innerHTML += "<td><a href=\"create_new_deck.html\">Sample Box</a></td>";
    
    var i = 0;
    var name = "placeholder";
    if (numOfStudyDecks < 4) {
        while (i < numOfStudyDecks) {
        //name = some way of getting name from firebase
        //document.getElementById("table").innerHTML += "<td><a href=\"[UserID_DeckName].html\">Deck Name</a></td>";
        //Add <a href="link to deck/queryOfFirebase">name</a> to row;
            numOfStudyDecks = numOfStudyDecks - 1;
        }
    } else {
        while (i < 3) {
            //Add <a href="link to deck">name</a> to row;
            //name = getNextName();
            numOfStudyDecks = numOfStudyDecks - 1;
            i += 1;
        }    
    }
    document.getElementById("table").innerHTML += "</tr>";
    return numOfStudyDecks;
}

function buildExtraRows(numOfStudyDecks) {
    while (numOfStudyDecks > 0) {
      document.getElementById("table").innerHTML += "<tr>";
      //append new row
      var i = 0;
      if (numOfStudyDecks < 5) {
        while (i < numOfStudyDecks) {
          //Add <a href="link to deck/queryOfFirebase">name</a> to row;
          //name = getNextName();
          numOfStudyDecks = numOfStudyDecks - 1;
        }
    } else {
        while (i < 4) {
            //Add <a href="link to deck">name</a> to row;
            //name = getNextName();
            numOfStudyDecks = numOfStudyDecks - 1;
            i += 1;
        }    
      }
      document.getElementById("table").innerHTML += "</tr>";
    }
}

/* Overwrites inner HTML of "table" div block in "view_study_decks.html"*/
function buildtable() {
  //Gets number of study decks
  var ref = firebase.database().ref("users/userID");
  ref.once("value").then(function(snapshot) {
    var numOfStudyDecks = snapshot.child("study_decks").numChildren();  
  }); 

  //Begin table
  document.getElementById("table").innerHTML += "<table>";
    
  //Builds first row in table
  numOfStudyDecks = buildFirstRow(numOfStudyDecks);
    
  //If needed, builds additional rows in table
  if (numOfStudyDecks > 0) {
    buildExtraRows(numOfStudyDecks);
  }
    
  //Finish Table
  document.getElementById("table").innerHTML += "</table>";
}

