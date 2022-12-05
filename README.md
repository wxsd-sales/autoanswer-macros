# Autoanswer Macros
These are a series of Webex Device macros which provides additional controls for auto answering a call based off your use case:

* Room Membership
Use a Webex Bot token and the Webex Messaging Membership API. The macro can check if the calling party is a member of a specific Room or Rooms will and then will answer if they are a member of any.

* A member of your Webex Org
The macro can leverage the Phonebook search command to verify if the calling party is a person or room calling from withing your Webex Org and answer for them. Blocking anyone from outside your Webex Org from having the call answer for them.

## Requirements

1. RoomOS/CE 9.6.x or above Webex Device.
2. Web admin access to the device to uplaod the macro.
3. Network connectivity for your Webex Device to make HTTP POSTs directly with your telemetry server.

## Setup

1. Download the ``autoanswer-macro.js`` file and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.

## Validation

Validated Hardware:

* Room Kit Pro
* Desk Pro
* Desk Hub
* Room Kit

This macro should work on other Webex Devices but has not been validated at this time.

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=autoanswer-macro)
