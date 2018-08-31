console.log("gSheetTab3");

var batchUpdateValuesRequestBody = {
      valueInputOption: 'RAW',  // TODO: Update placeholder value.
      // The new values to apply to the spreadsheet.
      data: [{"range": "repair!H2",
      "majorDimension": "ROWS",
      "values": [["выдан"],]
      }],  // TODO: Update placeholder value.
      // TODO: Add desired properties to the request body.
    };

  // реализация кнопки выдать
  var nameIssueOrder = document.getElementById("nameIssueOrder");

  nameIssueOrder.addEventListener("click", function() {
    var IssueOrder = parseInt(document.getElementById("nameIssue").value) + 1;
    console.log(IssueOrder);
    batchUpdateValuesRequestBody.data[0].range = "repair!H"+IssueOrder;
    console.log(batchUpdateValuesRequestBody.data[0].range);
    makeApiCall();

  });


// Google Api
function makeApiCall() {
  var params = {
      spreadsheetId: '1i0brXIbpyR0M38yo4WYQ0fgirGhxRZGXra9h-c9Oq64',};
  /*var batchUpdateValuesRequestBody = {
      valueInputOption: 'RAW',  // TODO: Update placeholder value.
      // The new values to apply to the spreadsheet.
      data: [{"range": "repair!H2",
      "majorDimension": "ROWS",
      "values": [["выдан"],]
      }],  // TODO: Update placeholder value.
      // TODO: Add desired properties to the request body.
    };*/


  var request = gapi.client.sheets.spreadsheets.values.batchUpdate(params, batchUpdateValuesRequestBody);
  request.then(function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);

  }, function(reason) {
      console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
    var API_KEY = 'AIzaSyB21iVuSKZeCeAOxFNLf7SXaCJQmbAS2fg';  // TODO: Update placeholder with desired API key.
    var CLIENT_ID = '287979718499-7i02abit89rp2rq7mgisr8oqfn1dqn74.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.
    // TODO: Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
    gapi.client.init({
      'apiKey': API_KEY,
      'clientId': CLIENT_ID,
      'scope': SCOPE,
      'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
      makeApiCall();
    }
  }
  function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }
  function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

