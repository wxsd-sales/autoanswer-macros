# Autoanswer Macros

These are a series of Webex Device macros which provides additional controls for auto answering a call based off your use case:

## Overview

Webex Devices already have an auto answer feature which can be enabled via a configuration, however this feature will answer all incoming calls. This can be a problem if you only want the device to auto answer for specific users or users who are in your Webex Org. These example macros provide demonstrate how you can apply this conditions using several methods mentioned below.

### Webex Space Membership

Use a Webex Bot token and the Webex Messaging Membership API. The macro can check if the calling party is a member of a specific Space or Spaces will and then will answer if they are a member of any.

### Member of your Webex Org

When the device receives a call, we also get access to the conference participant list before answering the call. Using this information, we can match the Org Id of the device against Org Id of the calling user or device and answer if they are the same.

### Local Device Favorites

Webex Devices let you tag contacts from the corporate phonebook or recents as favorites the devices local phonebook. We are able to lookup the incoming caller on this local phonebook and auto answer if they are present.

## Setup

### Prerequisites & Dependencies: 

- RoomOS/CE 9.6.x or above Webex Device.
- Web admin access to the device to upload the macro.
- For the Space Membership approach, a Webex Bot access token is required which is a member of a Webex Space

### Installation Steps:

1. Download the ``autoanswer-*.js`` file depending on your use case and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.

## Validation

Validated Hardware:

* Room Kit Pro
* Desk Pro
* Desk Hub
* Room Kit
* MX300 G2

These macro should work on other Webex Devices but has not been validated at this time.

## Demo

<!-- Keep the following statement -->
*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=autoanswer-macros) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
