import {BaseButton} from "react-native-gesture-handler";
import {Animated, StyleSheet} from "react-native";
import React, {useRef} from "react";
import {Pressable} from "expo-router/build/views/Pressable";

const Button = ({ children, theme }: {children: any, theme?: any}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        // Scale down when pressed
        Animated.spring(scaleValue, {
            toValue: 0.95, // Shrink the button a bit
            useNativeDriver: true,
            friction: 3,
        }).start();
    };

    const onPressOut = () => {
        // Scale back to original size
        Animated.spring(scaleValue, {
            toValue: 1, // Return to original scale
            useNativeDriver: true,
            friction: 3,
        }).start();
    };
    return <>
        <Pressable
            onPressIn={onPressIn} onPressOut={onPressOut}
            onPress={() => console.log("I've been pressed")}>
            <Animated.View style={[theme, style.button, { transform: [{ scale: scaleValue }] }]}>
                {children}
            </Animated.View>
        </Pressable>
    </>
}

const style = StyleSheet.create({
        button: {
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            width: process.env.EXPO_OS === "web" ? 100 : 300,
            margin: 4,
            height: 40,
        }
    }
)


export default Button;