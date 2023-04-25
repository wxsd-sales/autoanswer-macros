/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-1
 * Released: 12/22/22
 * 
 * This is a Webex Device macro which provides additional controls
 * for auto answering a call. The particular version will let you auto
 * answer if either host or cohost of a meeting is in your Org and also
 * For direct calls and adhoc meetings also we can determine auto
 * answer when memebers from your org are calling.
 * 
 * If no incoming calling include persons or devices from your Org, 
 * the macro will not answer.
 * 
 * 
 * Full Readme, source code and license agreement available on Github:
 * https://github.com/wxsd-sales/autoanswer-macros/
 * 
 ********************************************************/

import xapi from 'xapi';

const config = {
  meetings: {
    host: true,       //Answer for same org meeting hosts
    cohost: false     //Answer for same org meeting cohosts
  },
  adhocMeeting: true, //Answer for same org meeting guest
  direct: true        //Answer for same org direct calls
}

xapi.Event.Conference.ParticipantList.NewList.on(e => {
  xapi.Command.Conference.ParticipantList.Search({ CallId: e.CallId })
    .then(plist => processParticipantList(e.CallId, plist))
})

async function processParticipantList(callId, plist) {
  if(!plist.Participant)return;

  const callStatus = await xapi.Status.Call[callId].get()
  const conferenceStatus = await xapi.Status.Conference.Call[callId].get()

  const self = plist.Participant.filter(p => p.ParticipantId == plist.ParticipantSelf).pop();
  console.log(self.Status)
  const host = plist.Participant.filter(p => (p.IsHost == 'True' && p.OrgId == self.OrgId)).pop();
  const cohosts = plist.Participant.filter(p => p.CoHost == 'True')
  const guests = plist.Participant.filter(p => 
    (p.OrgId == self.OrgId && p.id != self.id && p.IsHost == 'False' && p.CoHost == 'False'))

  switch (self.Status){
    case 'pending-added-guest':
      console.log('This is a meeting')
      if(host && config.meetings.host){
        answer(callId, 'Answering for Host')
      } else if (cohosts.length > 0 && config.meetings.cohost) {
        answer(callId, 'Answering for Cohosts')
      } else if (guests.length > 0 && config.adhocMeeting){
        answer(callId, 'Answering for Guests')
      } else {
        console.log('No criteria met, ignoring call')
      }
      break;
    case 'alerting':
      console.log('This is a direct call')
      if(guests.length > 0 && config.direct){
        answer(callId, 'Answering for Guest')
      } else {
        console.log('No criteria met, ignoring call')
      }
      break;
  }

}

function answer(callId, message){
  console.log(message)
  xapi.Command.Call.Accept({ CallId: callId })
}
