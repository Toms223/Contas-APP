import {Navigator, Tabs} from "expo-router";
import React from "react";
import Slot = Navigator.Slot;

export default function landingLayout() {
    if(process.env.EXPO_OS === "web") {
        return <Slot/>
    }
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Hello"}}/>
        </Tabs>
    );
}