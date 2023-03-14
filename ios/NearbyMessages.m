//
//  NearbyMessages.m
//  smDemo
//
//  Created by Owner on 14/03/2023.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(NearbyMessages, RCTEventEmitter)

RCT_EXTERN_METHOD(startAdvertising: (NSString *)id)
RCT_EXTERN_METHOD(stopAdvertising)
RCT_EXTERN_METHOD(startListening)
RCT_EXTERN_METHOD(stopListening)

@end
