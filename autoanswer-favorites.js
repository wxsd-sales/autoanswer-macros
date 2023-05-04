/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 05/04/23
 * 
 * This Webex Device macro auto answers incoming calls for 
 * users which are saved as a favorite contact on the devices
 * local phonebook.
 * 
 * Full Readme, source code and license details available here:
 * https://github.com/wxsd-sales/autoanswer-macros/
 * 
 ********************************************************/

import xapi from 'xapi';

xapi.Event.IncomingCallIndication.on(processIncomingCall);

async function processIncomingCall(event) {
  console.log(`Incoming Call Detected - CallId [${event.CallId}] - Display Name [${event.DisplayNameValue}] - Remote URI [${event.RemoteURI}]`)
  if (!event.RemoteURI.startsWith("spark:")) {
    console.log(`Remote URI doesn't contain a spark prefix, ignoring call`);
    return
  }
  const normalisedURI = normaliseRemoteURI(event.RemoteURI);
  if (await isFavorite(normalisedURI)) {
    console.log(`UUID [${normalisedURI}] is a favorite, answering call`);
    xapi.Command.Call.Accept({ CallId: event.CallId });
    alert(`Call auto answered for ${event.DisplayNameValue}`)
  } else {
    console.log(`UUID [${normalisedURI}] was not matched, ignoring call`)
  }
}

async function isFavorite(uuid) {
  console.log(`Searching local phonebook for UUID [${uuid}]`)
  return xapi.Command.Phonebook.Search({ SearchString: uuid })
    .then(result => result.ResultInfo.TotalRows != '0')
}

function normaliseRemoteURI(number) {
  var regex = /^(sip:|h323:|spark:|h320:|webex:|locus:)/gi;
  number = number.replace(regex, '');
  return number;
}

function alert(text) {
  console.log(`Displaying Alert [${text}]`)
  xapi.Command.UserInterface.Message.Alert.Display({
    Duration: 10,
    Text: text,
    Title: 'Favorites Auto Answer Macro'
  });
}
