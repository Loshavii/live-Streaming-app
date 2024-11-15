// import React from "react";
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useParams } from "react-router-dom";
// const Room = () => {
//     const { roomId } = useParams();
//     function randomID(len) {
//         let result = '';
//         if (result) return result;
//         var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//           maxPos = chars.length,
//           i;
//         len = len || 5;
//         for (i = 0; i < len; i++) {
//           result += chars.charAt(Math.floor(Math.random() * maxPos));
//         }
//         return result;
//       }


//       // start the call
//     let myMeeting = async (element) => {
//         const appID = 1228038148;;
//         const serverSecret = "3796eb40da798a85d996a13852954fd7";
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), randomID(5));

//         // Create instance object from Kit Token.
//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//         // start the call
//         zp.joinRoom({
//         container: element,
//         sharedLinks:[
//             {
//                 name:"Personal link",
//                 url:window.location.protocol + "//" + window.location.host + window.location.pathname + "?roomId=" + roomId 
//             }
//         ],
//         scenario: {
//             mode: ZegoUIKitPrebuilt.LiveStreaming,
           
//         },
       
//         });
//     };


//     return (<div className="room" ref ={myMeeting} >Room</div>)
// }

// export default Room;



import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Copy, Link, Mic, MoreHorizontal, X } from 'lucide-react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

export default function Component() {
  const { roomId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  
  useEffect(() => {
    // Initialize Zego UIKit and join the room when the component mounts
    if (roomId) {
      const appID = 1228038148;
      const serverSecret = "3796eb40da798a85d996a13852954fd7";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), randomID(5));
      
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.getElementById('room-container'),
        sharedLinks: [
          {
            name: "Personal link",
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomId=${roomId}`
          }
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
        },
      });
    }
  }, [roomId]);

  const randomID = (len) => {
    let result = '';
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:5173/room/${roomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    // Trigger Zego UIKit to join room (using existing function)
    const container = document.getElementById('room-container');
    const appID = 1228038148;
    const serverSecret = "3796eb40da798a85d996a13852954fd7";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, randomID(5), randomID(5));
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    
    zp.joinRoom({
      container: container,
      sharedLinks: [
        {
          name: "Personal link",
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomId=${roomId}`
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#111827] p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-6"
        >
          {/* Video Preview Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[rgba(31,41,55,0.5)] to-[rgba(55,65,81,0.4)] shadow-xl lg:flex-1"
          >
            {/* Preview Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-24 h-24 rounded-full bg-[#10B981] flex items-center justify-center text-white text-4xl font-bold"
              >
                {name.charAt(0).toUpperCase() || '?'}
              </motion.div>
            </motion.div>

            {/* Control Buttons */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full ${
                  isMuted ? 'bg-red-500' : 'bg-[rgba(31,41,55,0.5)]'
                } backdrop-blur-md border border-[#374151] transition-colors duration-200`}
              >
                <Mic className={`w-6 h-6 ${isMuted ? 'text-white' : 'text-[#10B981]'}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCameraOff(!isCameraOff)}
                className={`p-4 rounded-full ${
                  isCameraOff ? 'bg-red-500' : 'bg-[rgba(31,41,55,0.5)]'
                } backdrop-blur-md border border-[#374151] transition-colors duration-200`}
              >
                <Camera className={`w-6 h-6 ${isCameraOff ? 'text-white' : 'text-[#10B981]'}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-4 rounded-full bg-[rgba(31,41,55,0.5)] backdrop-blur-md border border-[#374151]"
              >
                <MoreHorizontal className="w-6 h-6 text-[#10B981]" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Join Room and Share Link Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-80 space-y-6"
          >
            {/* Join Room Section */}
            <motion.div
              className="p-6 rounded-xl bg-[rgba(31,41,55,0.5)] border border-[#374151]"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Join Room</h2>
              <div className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 rounded bg-[rgba(55,65,81,0.3)] border border-[#374151] text-white placeholder-[#9CA3AF]"
                />
                <button
                  onClick={handleJoin}
                  className="w-full p-2 rounded bg-[#10B981] hover:bg-[#059669] text-white transition-colors duration-200"
                >
                  Join
                </button>
              </div>
            </motion.div>

            {/* Share Link Section */}
            <motion.div
              className="p-6 rounded-xl bg-[rgba(31,41,55,0.5)] border border-[#374151]"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Share Link</h2>
              <div className="space-y-4">
                <input
                  value={`http://localhost:5173/room/${roomId}`}
                  readOnly
                  className="w-full p-2 rounded bg-[rgba(55,65,81,0.3)] border border-[#374151] text-white"
                />
                <button
                  onClick={handleCopy}
                  className="w-full p-2 rounded bg-[#10B981] hover:bg-[#059669] text-white transition-colors duration-200"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
