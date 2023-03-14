//
//  NearbyMessages.swift
//  smDemo
//
//  Created by Owner on 14/03/2023.
//

//
//  nearbyMessages.swift
//  nearbyMsgs
//
//  Created by Owner on 09/03/2023.
//

import Foundation

/*
 TODO:
 1. ADD ERROR CASES (with alerts) LIKE IN BT TEST
 
 Usability ##
 2. Track the nearby permission state
 3. Tracking user settings that affect Nearby
 4. Overriding the Nearby permission dialog??
          ##
 
 */
@objc(NearbyMessages)
class NearbyMessages: RCTEventEmitter {
  
  private var messageManager: GNSMessageManager?
  private var publication: GNSPublication?
  private var subscription: GNSSubscription?
  
  override init(){
    super.init()
    //remove this??
    GNSMessageManager.setDebugLoggingEnabled(true)
    messageManager = GNSMessageManager(apiKey: "AIzaSyCLqt1OTGt-GNSraCSBb5aSc8UrUhmyK1o")
    
  }
  
  //make so only advertises on ble and wifi (not audio)
  @objc
  func startAdvertising(_ id: String){
    
    guard let messageManager = messageManager else {
      sendEvent(withName: "AdvertisingStatus", body: "Error: null message manager")
      return }
    
    // Ensure that this code runs on the main thread
      DispatchQueue.main.async {
        let strategy = GNSStrategy(paramsBlock: { params in
                guard let params = params else { return }
                params.allowInBackground = true
                params.discoveryMediums = .BLE
            })
        self.publication = messageManager.publication(with: GNSMessage(content: id.data(using: .utf8)), paramsBlock: { params in
          guard let params = params else { return }
          params.strategy = strategy
      })
        self.sendEvent(withName: "AdvertisingStatus", body: "StartedAdvertising")
      }
    
  }
  
  @objc func stopAdvertising(){
    publication = nil
    sendEvent(withName: "AdvertisingStatus", body: "StoppedAdvertising")
  }
  
  //todo: make so only listens on bluetooth + edit info.plist accordingly? (atm listens on all mediums)
  @objc
  func startListening(){
    guard let messageManager = messageManager else {
      sendEvent(withName: "ListeningStatus", body: "Error: null message manager")
      return }
    DispatchQueue.main.async {
      self.subscription = messageManager.subscription(
        messageFoundHandler: { (message: GNSMessage?) in
          
          guard let messageData = message?.content,
                let messageString = String(data: messageData, encoding: .utf8) else {
            return
          }
          self.sendEvent(withName: "UserDetected", body: messageString)
          
        },
        messageLostHandler: { (message: GNSMessage?) in
          // Remove the name from the list
        }
      )
      self.sendEvent(withName: "ListeningStatus", body: "StartedListening")
    }
  }
  
  @objc
  func stopListening(){
    subscription = nil
    sendEvent(withName: "ListeningStatus", body: "Stopped Listening")
  }
  
  @objc
    override static func requiresMainQueueSetup() -> Bool{
      return true;
    }
  
  override func supportedEvents() -> [String]! {
        return ["AdvertisingStatus", "UserDetected", "ListeningStatus"];
    }
}


