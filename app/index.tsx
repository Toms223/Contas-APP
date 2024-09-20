import {StyleSheet, useColorScheme, View} from "react-native";
import {Text} from 'react-native';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from "expo-splash-screen";
import Button from "@/components/Button";
import Logo from "../assets/logo.svg"
import {appTheme, position, text, themedStyle} from "@/components/styles";



export default function Index(){
    const [loaded] = useFonts({
        SourceSansPro: require('../assets/fonts/Source-Sans-Pro.ttf'),
    });

    const colorScheme = useColorScheme();
    const containerTheme = colorScheme === "dark" ? themedStyle.ContainerDarkTheme : themedStyle.ContainerLightTheme;
    const buttonTheme = colorScheme === "dark" ? themedStyle.ButtonDarkTheme : themedStyle.ButtonLightTheme;
    const textTheme = colorScheme === "dark" ? themedStyle.TextDarkTheme : themedStyle.TextLightTheme;
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <View style={[containerTheme, position.center]}>
            <Logo height={58*2} width={169*2}/>
            <Text style={[textTheme, text.h1]}> Manage your bills with ease.</Text>
            <Button theme={buttonTheme}>
                <Text style={[textTheme, text.p]}>Sign In</Text>
            </Button>
            <Button theme={buttonTheme}>
                <Text style={[textTheme, text.p]}>Log In</Text>
            </Button>
            <View>
            </View>
        </View>
    )
}

