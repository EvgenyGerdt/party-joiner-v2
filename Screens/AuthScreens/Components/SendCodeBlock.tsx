import React, {useState} from 'react';
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {checkCode, resetCode} from "../../../Store/Actions/reserPassword.actions";

const SendCodeBlock = () => {
  const navigation = useNavigation();
  const dispatch: any = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [code, setCode] = useState('');

  const [isShowCodeNotif, setShowCodeNotif] = useState(false);

  const [isShowUsernameNotif, setShowUsernameNotif] = useState(false);
  const [isShowEmailNotif, setShowEmailNotif] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [isCodeSend, setIsCodeSend] = useState(false);

  const handleShowInfoAlert = () => {
      Alert.alert(
          "Информация",
          "На ваш почтовый адрес придет код для восстановления " +
          "пароля, не забывайте его, он вас любит :)",
          [{text: "Хорошо", style: "cancel"}]
      );
  };

  const handleSendCode = () => {
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

      if (!isShowEmailNotif && !isShowUsernameNotif) {
          setLoading(true);
          dispatch(resetCode(email, username))
              .then(() => {
                  setLoading(false);
                  setIsCodeSend(true);
              }).catch((err: Error) => console.log(err.message));
      }
  };

  const handleCheckCode = () => {
      if (!code || code.length < 6) {
          setShowCodeNotif(true);
          return;
      } else {
          setShowCodeNotif(false);
      }

      if (!isShowCodeNotif) {
          setLoading(true);
          dispatch(checkCode(code))
              .then(() => {
                  setLoading(false);
              }).catch((err: Error) => console.log(err.message))
      }
  }

    return (
      <View style={styles.resetPasswordContainer}>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesomeIcon icon={faAngleLeft} size={28} color='#ffffff'/>
              </TouchableOpacity>
              <Text style={[styles.headerTitle, styles.darkThemeText]}>Восстановление пароля</Text>
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
              { isCodeSend ?
                  <TextInput
                      style={[styles.input, styles.darkThemeBtn,
                          isShowUsernameNotif ? {borderColor: 'red'} : null]}
                      placeholderTextColor='#ffffff'
                      placeholder="Введите 6-значный код"
                      onChangeText={setCode}
                  />
                  :
                  <TextInput
                      style={[styles.input, styles.darkThemeBtn,
                          isShowUsernameNotif ? {borderColor: 'red'} : null]}
                      placeholderTextColor='#ffffff'
                      placeholder="Никнейм"
                      onChangeText={setUsername}
                  />
              }
              { isShowEmailNotif ?
                  <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
                  :
                  null
              }
              { isCodeSend ?
                  null
                  :
                  <TextInput
                      style={[styles.input, styles.darkThemeBtn,
                          isShowEmailNotif ? {borderColor: 'red'} : null]}
                      placeholderTextColor='#ffffff'
                      placeholder="Почтовый адрес"
                      onChangeText={setEmail}
                  />
              }
          </View>
          <View>
              { isCodeSend ?
                  <TouchableOpacity onPress={handleCheckCode} style={{width: '100%'}}>
                      <LinearGradient style={styles.buttonBackground} colors={['#e54f6d', '#f8c630']}>
                          { isLoading ?
                              <ActivityIndicator size="small" color="#ffffff" />
                              :
                              <Text style={styles.btnText}>Отправить</Text>
                          }
                      </LinearGradient>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={handleSendCode} style={{width: '100%'}}>
                      <LinearGradient style={styles.buttonBackground} colors={['#e54f6d', '#f8c630']}>
                          { isLoading ?
                              <ActivityIndicator size="small" color="#ffffff" />
                              :
                              <Text style={styles.btnText}>Завершить</Text>
                          }
                      </LinearGradient>
                  </TouchableOpacity>
              }
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
    resetPasswordContainer: {
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
    alertNotif: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 12,
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
});

export default SendCodeBlock;
