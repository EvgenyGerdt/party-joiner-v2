import React, {FunctionComponent, useEffect, useState} from 'react';

import {SafeAreaView, View, Text, StyleSheet, ActivityIndicator} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {load} from "../Store/Actions/auth.actions";

const MainScreenView = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isLoading, setLoading] = useState(false);
    const [isChecking, setChecking] = useState(false);

    const handleCheckAuth = async () => {
        try {
            setChecking(true);
            const id = await AsyncStorage.getItem('@id');
            if (id !== null) {
                setChecking(false);
                setLoading(true);
                dispatch(load(id)).then(() => {
                    navigation.navigate('Profile')
                    setLoading(false);
                });
            } else {
                await AsyncStorage.removeItem('@id');
                navigation.navigate('Login');
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            handleCheckAuth()
                .then(() => console.log('Success'))
                .catch((e) => console.log(e.message));
        }, 2000);
    });

    return (
      <SafeAreaView style={[styles.background, styles.darkBackground]}>
          <LinearGradient style={styles.icon} colors={['#e54f6d', '#f8c630']}>
              <Text style={styles.iconText}>PJ</Text>
          </LinearGradient>
          <View>
              <ActivityIndicator size="large" color='#e54f6d' style={{marginBottom: 5}}/>
              { isChecking ? <Text style={{color: 'white', fontSize: 16}}>Проверяем данные...</Text> : null }
              { isLoading ? <Text style={{color: 'white', fontSize: 16}}>Загружаем данные...</Text> : null }
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
    icon: {
        padding: 40,
        borderRadius: 120,
        backgroundColor: 'red',
        marginBottom: 20,
    },
    iconText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
    }
});

export default MainScreenView;
