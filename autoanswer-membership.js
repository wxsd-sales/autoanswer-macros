/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 12/05/22
 * 
 * This is a Webex Device macro which provides additional controls
 * for auto answering a call. The particular version will answer a call
 * from a person if they are present in specified spaces a Bot is also in.
 * 
 * Full Readme, source code and license agreement available on Github:
 * https://github.com/wxsd-sales/autoanswer-macros/
 * 
 ********************************************************/
 
import xapi from 'xapi';

const config = {
  botToken: '<Your Webex Bot Token>',
  roomIds: [      // Rooms you wish the bot to check the calling party is present in
    '<1st Webex Room ID>',
    '<2nd Webex Room ID>'
  ]
}

xapi.Config.HttpClient.Mode.set('On');
xapi.Event.IncomingCallIndication.on(processIncomingCall);

function processIncomingCall(event) {
  console.log(event)
  console.log('Incoming Call Detected')
  console.log('Display Name: ' + event.DisplayNameValue);
  console.log('Remote URI: ' + event.RemoteURI);
  if (!event.RemoteURI.startsWith("spark:")) {
    console.log(`Remote URI doesn't contain a spark prefrix, ignoring call`);
    return
  }

  checkRooms(config.roomIds, normaliseRemoteURI(event.RemoteURI))
}

function normaliseRemoteURI(number) {
  var regex = /^(sip:|h323:|spark:|h320:|webex:|locus:)/gi;
  number = number.replace(regex, '');
  return number;
}

async function checkRooms(rooms, personId) {
  if (rooms.length < 1) {
    console.log('No room provided')
    return
  }

  for (let i = 0; i < rooms.length; i++) {
    await checkMembership(rooms[i], personId);
  }

}


// Gets list of devices with a specific tag
function checkMembership(roomId, personId) {
  console.log(`Checking ${personId} membership in roomd: ${roomId}`)
  let url = `https://webexapis.com/v1/memberships?`
  url += `roomId=${roomId}`
  url += `&personId=${personId}`
  return xapi.Command.HttpClient.Get({
    Header: ["Authorization: Bearer " + config.botToken],
    ResultBody: 'PlainText',
    Url: url
  })
    .then((r) => {
      const results = JSON.parse(r.Body).items;
      if(results.length > 0 ) {
        console.log('User was found in roomId: ' +roomId)
        xapi.Command.Call.Accept();
      } 
      return;
    })
    .catch(e => console.log('Unable to get room membership: ', e.message))
}
