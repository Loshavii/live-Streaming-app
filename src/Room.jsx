import React from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from "react-router-dom";
const Room = () => {
    const { roomId } = useParams();
    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
          maxPos = chars.length,
          i;
        len = len || 5;
        for (i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
      }


      // start the call
    let myMeeting = async (element) => {
        const appID = 1228038148;;
        const serverSecret = "3796eb40da798a85d996a13852954fd7";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), randomID(5));

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
        container: element,
        sharedLinks:[
            {
                name:"Personal link",
                url:window.location.protocol + "//" + window.location.host + window.location.pathname + "?roomId=" + roomId 
            }
        ],
        scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
           
        },
       
        });
    };


    return (<div className="room" ref ={myMeeting} >Room</div>)
}

export default Room;
