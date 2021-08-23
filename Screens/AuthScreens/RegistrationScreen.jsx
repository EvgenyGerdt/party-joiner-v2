import React, {useState, useRef, useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    SafeAreaView,
    Animated,
    ActivityIndicator,
    Alert,
    Keyboard,
    StyleSheet
} from "react-native";

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {LinearGradient} from "expo-linear-gradient";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {register} from "../../Store/Actions/auth.actions";

import StringUtils from "../../Utils/StringUtils";

const RegistrationScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /* REGISTRATION FIELDS */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [secretWord, setSecretWord] = useState('');

    /* VALIDATION FLAGS */
    const [isShowUsernameNotif, setShowUsernameNotif] = useState(false);
    const [isShowEmailNotif, setShowEmailNotif] = useState(false);
    const [isShowRepeatPasswordNotif, setShowRepeatPasswordNotif] = useState(false);
    const [isShowPasswordLengthNotif, setShowPasswordLengthNotif] = useState(false);
    const [isShowSecretWordNotif, setSecretWordNotif] = useState(false);

    const [isCorrectEmail, setCorrectEmail] = useState(true);

    /* RESULT FLAGS */
    const [trySend, setTrySend] = useState(false);
    const [isExists, setExists] = useState(false);

    const authData = useSelector((state) => state.auth, shallowEqual) || {};

    /* ACTIVITY LOADER FLAG ON REQUEST */
    const [isLoading, setLoading] = useState(false);

    const startScaleValue = useRef(new Animated.Value(1.25)).current;
    const endScaleValue = 1.4;

    /* CIRCLES BOUNCE ANIMATION  */
    useEffect(() => {
        Animated.loop(Animated.spring(startScaleValue, {
            toValue: endScaleValue,
            friction: 1,
            useNativeDriver: true,
        }), {iterations: 1}).start();
    }, [startScaleValue, endScaleValue]);

    useEffect(() => {
        setExists(authData.isExists);
    }, [authData]);

    const handleShowInfoAlert = () => {
        Alert.alert(
            "Информация",
            "Секретное слово в будущем может " +
            "потребоваться для восстановления пароля, не забудьте его!",
            [
                {
                    text: "Хорошо",
                    style: "cancel"
                },
            ]
        );
    };

    const validateTextByEmail = (text) => {
        if (!StringUtils.isEmail(text)) {
            setCorrectEmail(false);
            console.log("БЯДА :c");
            return;
        }
        setEmail(text);
        setCorrectEmail(true);
    };

    const handleRegistration = async () => {
        setTrySend(false);

        if (!username) {
            setShowUsernameNotif(true);
            return;
        } else {
            setShowUsernameNotif(false);
        }

        if (!email) {
            setShowEmailNotif(true);
            return;
        } else {
            setShowEmailNotif(false);
        }

        if (password.length < 6) {
            setShowPasswordLengthNotif(true);
            return;
        } else {
            setShowPasswordLengthNotif(false);
        }

        if (repeatPassword !== password) {
            setShowRepeatPasswordNotif(true);
            return;
        } else {
            setShowRepeatPasswordNotif(false);
        }

        if (!secretWord) {
            setSecretWordNotif(true);
            return;
        } else {
            setSecretWordNotif(false);
        }

        if (!isShowPasswordLengthNotif && !isShowRepeatPasswordNotif
            && !isShowEmailNotif && !isShowUsernameNotif
            && !isShowSecretWordNotif && isCorrectEmail) {

            setLoading(true);
            await dispatch(register(username, email, password, secretWord));

            setLoading(false);
            if (isExists) {
                setTrySend(true);
                return;
            }
            Alert.alert(
                "Информация",
                "Вы успешно зарегистрированы!",
                [
                    {
                        text: "Хорошо",
                        onPress: () => navigation.goBack(),
                        style: "cancel"
                    },
                ]
            );
        }
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
              <SafeAreaView style={[styles.background, styles.darkBackground]}>
                  <View style={styles.registrationContainer}>
                      <View style={styles.header}>
                          <TouchableOpacity onPress={() => navigation.goBack()}>
                              <FontAwesomeIcon icon={faAngleLeft} size={28} color='#ffffff'/>
                          </TouchableOpacity>
                          <Text style={[styles.headerTitle, styles.darkThemeText]}>Регистрация</Text>
                          <TouchableOpacity onPress={handleShowInfoAlert}>
                              <FontAwesomeIcon icon={faInfoCircle} size={28} color='#ffffff' />
                          </TouchableOpacity>
                      </View>
                      <View style={styles.inputsBlock}>
                          { isShowUsernameNotif ?
                              <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
                              :
                              null
                          }
                          <TextInput
                              style={[styles.input, styles.darkThemeBtn,
                                  isShowUsernameNotif ? {borderColor: 'red'} : null]}
                              placeholderTextColor='#ffffff'
                              placeholder="Никнейм"
                              onChangeText={setUsername}
                          />
                          { isShowEmailNotif ?
                              <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
                              :
                              null
                          }
                          { !isCorrectEmail ?
                              <Text style={styles.alertNotif}>Пожалуйста, введите корректный email</Text>
                              :
                              null
                          }
                          <TextInput
                              style={[styles.input, styles.darkThemeBtn,
                                  isShowEmailNotif ? {borderColor: 'red'} : null]}
                              placeholderTextColor='#ffffff'
                              placeholder="Почтовый адрес"
                              onChangeText={(text) => validateTextByEmail(text)}
                          />
                          { isShowPasswordLengthNotif ?
                              <Text style={styles.alertNotif}>Длина пароля должна быть больше 6 символов</Text>
                              :
                              null
                          }
                          <TextInput
                              style={[styles.input, styles.darkThemeBtn,
                                  isShowPasswordLengthNotif ? {borderColor: 'red'} : null]}
                              placeholderTextColor='#ffffff'
                              secureTextEntry={true}
                              placeholder="Пароль"
                              onChangeText={setPassword}
                          />
                          { isShowRepeatPasswordNotif ?
                              <Text style={styles.alertNotif}>Пароли не совпадают</Text>
                              :
                              null
                          }
                          <TextInput
                              style={[styles.input, styles.darkThemeBtn,
                                  isShowRepeatPasswordNotif ? {borderColor: 'red'} : null]}
                              placeholderTextColor='#ffffff'
                              secureTextEntry={true}
                              placeholder="Повторите пароль"
                              onChangeText={setRepeatPassword}
                          />
                          { isShowSecretWordNotif ?
                              <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
                              :
                              null
                          }
                          <TextInput
                              style={[styles.input, styles.darkThemeBtn,
                                  isShowSecretWordNotif ? {borderColor: 'red'} : null]}
                              placeholderTextColor='#ffffff'
                              secureTextEntry={true}
                              placeholder="Секретное слово"
                              onChangeText={setSecretWord}
                          />
                      </View>
                      <View>
                          { isExists && trySend ?
                              <Text style={styles.alertNotif}>Ошибка регистрации, аккаунт уже существует</Text>
                              :
                              null
                          }
                          <TouchableOpacity onPress={handleRegistration} style={{width: '100%'}}>
                              <LinearGradient style={styles.buttonBackground} colors={['#e54f6d', '#f8c630']}>
                                  { isLoading ?
                                      <ActivityIndicator size="small" color="#ffffff" />
                                      :
                                      <Text style={styles.btnText}>Завершить</Text>
                                  }
                              </LinearGradient>
                          </TouchableOpacity>
                      </View>
                  </View>
                  <Animated.View
                      style={[styles.circle, {transform: [{scale: startScaleValue}], width: '100%', height: '100%'}]}>
                      <LinearGradient
                          style={[styles.circle, styles.circle1]}
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
                  <Animated.View
                      style={[styles.circle, {transform: [{scale: startScaleValue}], width: '100%', height: '100%'}]}>
                      <LinearGradient
                          style={[styles.circle, styles.circle3]}
                          colors={['#E54F6DFF', '#33333b']}
                      />
                  </Animated.View>
                  <Animated.View
                      style={[styles.circle, {transform: [{scale: startScaleValue}], width: '100%', height: '100%'}]}>
                      <LinearGradient
                          style={[styles.circle, styles.circle4]}
                          colors={['#f8c630', '#17181e']}
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
    registrationContainer: {
        width: '100%',
        height: '100%',
        padding: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    darkThemeText: {
        color: '#ffffff',
    },
    lightThemeText: {
        color: '#ffffff',
    },
    inputsBlock: {
      paddingTop: 50,
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
    darkThemeBtn: {
        borderColor: '#33333b',
    },
    lightThemeBtn: {
        borderColor: '#17181e',
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
    circle: {
        position: 'absolute',
        zIndex: -1,
    },
    circle1: {
        width: 200,
        height: 200,
        borderRadius: 200/2,
        bottom: 0,
        left: 50,
    },
    circle2: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        bottom: 100,
        right: 20,
    },
    circle3: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        bottom: 60,
        right: 70,
        zIndex: 1
    },
    circle4: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        bottom: 20,
        right: 40,
        zIndex: 2
    },
    alertNotif: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
    }
});

export default RegistrationScreen;
