import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from "@react-navigation/native";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Animated,
} from "react-native";

import appleAuth from "@invertase/react-native-apple-authentication";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

import {LinearGradient} from "expo-linear-gradient";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faApple, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {login} from "../../Store/Actions/auth.actions";

const LoginScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isAuthenticated, setAuthenticated] = useState(false);

    const authData = useSelector((state) => state.auth, shallowEqual) || {};

    const [isShowUsernameNotif, setShowUsernameNotif] = useState(true);
    const [isShowPasswordNotif, setShowPasswordNotif] = useState(true);

    const [fieldDirty, setFieldDirty] = useState(false);
    const [trySend, setTrySend] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const startScaleValue = useRef(new Animated.Value(1)).current;
    const endScaleValue = 1.4;

    useEffect(() => {
        Animated.loop(Animated.spring(startScaleValue, {
            toValue: endScaleValue,
            friction: 1,
            useNativeDriver: true,
        }), {iterations: 1}).start();
    }, [startScaleValue, endScaleValue]);

    useEffect(() => {
        setAuthenticated(authData.isAuthenticated);
    }, [authData]);

    const handleAppleLogin = async () => {
      return await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      }).then((appleAuthResponse) => console.log(appleAuthResponse));
    };

    const handleGoogleLogin = async () => {

    };

    const handleDefaultLogin = async () => {
        setFieldDirty(true);
        setTrySend(false);

        if (!username) {
            setShowUsernameNotif(true);
        } else {
            setShowUsernameNotif(false);
        }

        if (!password) {
            setShowPasswordNotif(true);
        } else {
            setShowPasswordNotif(false);
        }

        if (!isShowUsernameNotif && !isShowPasswordNotif) {
            setLoading(true);
            await dispatch(login(username, password));

            setLoading(false);
            if (!isAuthenticated) {
                setTrySend(true);
                return;
            }
            navigation.navigate('Profile');
        }
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
              <SafeAreaView style={[styles.background, styles.darkBackground]}>
                  <View style={styles.authContainer}>
                      <Text style={[styles.authTitle, styles.darkThemeText]}>Войти.</Text>
                      <View style={styles.otherAuthContainer}>
                          <TouchableOpacity onPress={handleGoogleLogin} style={[styles.authOtherBtn, styles.darkThemeBtn]}>
                              <FontAwesomeIcon icon={faGoogle} size={28} color='#ffffff'/>
                              <Text style={[styles.otherBtnText, styles.darkThemeText]}>Продолжить с Google</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={handleAppleLogin} style={[styles.authOtherBtn, styles.darkThemeBtn]}>
                              <FontAwesomeIcon icon={faApple} size={28} color='#ffffff'/>
                              <Text style={[styles.otherBtnText, styles.darkThemeText]}>Продолжить с Apple</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                  <Text style={{color: '#ffffff', marginTop: -30, marginBottom: -10}}>или</Text>
                  <Text>{isAuthenticated}</Text>
                  <View style={[styles.authContainer, styles.inputsBlock]}>
                      { isShowUsernameNotif && fieldDirty ?
                          <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
                          :
                          null
                      }
                      <TextInput
                          style={[styles.input, styles.darkThemeBtn,
                              isShowUsernameNotif && fieldDirty? {borderColor: 'red'} : null]}
                          placeholder="Никнейм"
                          placeholderTextColor="#ffffff"
                          onChangeText={(text) => {
                              setFieldDirty(true)
                              setUsername(text)
                              setShowUsernameNotif(false)
                          }}
                      />
                      { isShowPasswordNotif && fieldDirty ?
                          <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
                          :
                          null
                      }
                      <TextInput
                          style={[styles.input, styles.darkThemeBtn,
                              isShowPasswordNotif && fieldDirty ? {borderColor: 'red'} : null]}
                          secureTextEntry={true}
                          placeholder="Пароль"
                          placeholderTextColor="#ffffff"
                          onChangeText={(text) => {
                              setFieldDirty(true)
                              setPassword(text)
                              setShowPasswordNotif(false)
                          }}
                      />
                  </View>
                  <View style={styles.authContainer}>
                      { !isAuthenticated && trySend ?
                          <Text style={styles.alertNotif}>Ошибка авторизации, проверьте введенные данные</Text>
                          :
                          null
                      }
                      <TouchableOpacity onPress={handleDefaultLogin} style={{width: '100%'}}>
                          <LinearGradient style={styles.buttonBackground} colors={['#e54f6d', '#f8c630']}>
                              { isLoading ?
                                  <ActivityIndicator size="small" color="#ffffff" />
                                  :
                                  <Text style={styles.btnText}>Войти</Text>
                              }
                          </LinearGradient>
                      </TouchableOpacity>
                      <View style={styles.registBlock}>
                          <Text style={styles.questionText}>Еще не тусовщик?</Text>
                          <Button
                              onPress={() => navigation.navigate('Register')}
                              color="#ffffff"
                              title="Создать аккаунт"
                          />
                      </View>
                      <Button onPress={() => navigation.navigate('ResetPassword')} color="#ffffff" title="Забыли пароль?" />
                  </View>
                  <Animated.View
                      style={[styles.circle, {transform: [{scale: startScaleValue}], width: '100%', height: '100%'}]}>
                      <LinearGradient
                          style={[styles.circle1]}
                          colors={['#e54f6d', '#ecc56f', '#f8c630']}
                      />
                  </Animated.View>
                  <Animated.View
                      style={[styles.circle, {transform: [{scale: startScaleValue}], width: '100%', height: '100%'}]}>
                      <LinearGradient
                          style={[styles.circle, styles.circle2]}
                          colors={['#17181e', '#33333b']}
                      />
                  </Animated.View>
              </SafeAreaView>
          </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    circle: {
        position: 'absolute',
        zIndex: -1,
    },
    circle1: {
        width: 200,
        height: 200,
        borderRadius: 200/2,
        top: -35,
        left: -35,
    },
    circle2: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        top: 60,
        right: 10,
    },
    authContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30,
        zIndex: 2,
    },
    inputsBlock: {
      alignItems: 'flex-start',
    },
    authTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    darkThemeText: {
        color: '#ffffff',
    },
    lightThemeText: {
        color: '#17181e',
    },
    otherAuthContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    authOtherBtn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 20,
    },
    darkThemeBtn: {
        borderColor: '#33333b',
    },
    lightThemeBtn: {
        borderColor: '#17181e',
    },
    otherBtnText: {
        fontSize: 18,
    },
    input: {
        borderRadius: 20,
        borderWidth: 1,
        width: '100%',
        padding: 20,
        marginBottom: 20,
        color: '#ffffff',
        fontSize: 18,
    },
    buttonBackground: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
    },
    btnText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    registBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
    },
    questionText: {
        color: '#c0c0c0',
        fontSize: 18,
    },
    alertNotif: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
    },
});

export default LoginScreen;
