/********************************************************
Copyright (c) 2022 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
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
 * for auto answering a call. The particular version will check if the
 * caller is a Room or Person in your own org based off a phonebook lookup.
 * 
 * Full Readme and source code availabel on Github:
 * https://github.com/wxsd-sales/autoanswer-macros/
 * 
 ********************************************************/
 
import xapi from 'xapi';

xapi.Config.HttpClient.Mode.set('On');
xapi.Event.IncomingCallIndication.on(processIncomingCall);

function processIncomingCall(event) {
  console.log(event)
  console.log('Incoming Call detected')
  console.log('Display Name: ' + event.DisplayNameValue);
  console.log('Remote URI: ' + event.RemoteURI);

  if (!event.RemoteURI.startsWith("spark:")) {
    console.log(`Remote URI doesn't contain a spark prefrix, ignoring call`);
    return
  }

  // Search phonebook for the incoming call display name
  xapi.Command.Phonebook.Search({
    PhonebookType: 'Corporate',
    SearchString: event.DisplayNameValue
  })
    .then(r => {
      // Only check results if we got any contacts back
      if (r.hasOwnProperty('Contact')) {
        console.log('Number of search results found: ' + r.Contact.length)
        const remoteURI = normaliseRemoteURI(event.RemoteURI)
        // Compare the RemoteURI with the search results
        for (let i = 0; i < r.Contact.length; i++) {
          if (r.Contact[i].ContactId == remoteURI) {
            console.log('RemoteURI match found, answering call');
            xapi.Command.Call.Accept();
            return;
          }
        }
        console.log('RemoteURI had no match, ingoring call')
      } else {
        console.log('No results found, ingoring call')
      }
    })
}

function normaliseRemoteURI(number) {
  var regex = /^(sip:|h323:|spark:|h320:|webex:|locus:)/gi;
  number = number.replace(regex, '');
  return number;
}
