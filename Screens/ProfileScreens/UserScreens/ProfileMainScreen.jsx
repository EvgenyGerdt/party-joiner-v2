import React, {useState, useEffect, useCallback, useRef} from 'react';

import {
    SafeAreaView,
    TouchableOpacity,
    Text,
    View,
    Animated,
    StyleSheet
} from "react-native";

import Svg from "react-native-svg";
import {useSelector} from "react-redux";

const ProfileMainScreen = () => {
    const username = useSelector((state) => state.auth.user.username);

    return (
        <SafeAreaView style={[styles.background, styles.darkBackground]}>
            <View style={styles.profileContainer}>
                <Text>
                    { username }
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    darkBackground: {
        backgroundColor: '#17181e',
    },
    lightBackground: {
        backgroundColor: '#ffffff',
    },
    profileContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileMainScreen;


