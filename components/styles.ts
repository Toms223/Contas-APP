import {StyleSheet} from "react-native";

export const appTheme = {
    lightTheme : {
        colors: {
            primary: "#72c5bc",
            background: "#e8fffa",
            text: "#72c5bc",
            card: "#beddda",
            border: "#72c5bc",
            notification: "d6f2f1"
        }
    },
    darkTheme : {
        colors: {
            primary: "#003a31",
            background: "#005945",
            text: "#72c5bc",
            card: "#243f3f",
            border: "#72c5bc",
            notification: "#51b7ab"
        }
    }
}

export const themedStyle = StyleSheet.create({
    ContainerLightTheme: {
        backgroundColor: appTheme.lightTheme.colors.background,
        color: appTheme.lightTheme.colors.text
    },
    ButtonLightTheme: {
        backgroundColor: appTheme.lightTheme.colors.card,
        color: appTheme.lightTheme.colors.text
    },
    ContainerDarkTheme: {
        backgroundColor: appTheme.darkTheme.colors.background,
        color: appTheme.darkTheme.colors.text
    },
    ButtonDarkTheme: {
        backgroundColor: appTheme.darkTheme.colors.card,
        color: appTheme.darkTheme.colors.text
    },
    TextDarkTheme: {
        color: appTheme.darkTheme.colors.text
    },
    TextLightTheme: {
        color: appTheme.lightTheme.colors.text
    },
})
export const position = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export const text = StyleSheet.create({
    h1: {
        textAlign: "center",
        fontSize: 48,
        fontFamily: "SourceSansPro",
        fontWeight: "bold"
    },
    h3: {
        textAlign: "center",
        fontSize: 24,
        fontFamily: "SourceSansPro",
        fontWeight: "bold"
    },
    p: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "SourceSansPro",
        fontWeight: process.env.EXPO_OS === "web" ? "normal" : "bold"
    },
    thin: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "SourceSansPro",
    }
})
