import React, {useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation} from "@react-navigation/native";
import {connect, useDispatch} from "react-redux";
import {resetPassword} from "../../../Store/Actions/reserPassword.actions";

const ResetPasswordBlock = ({reset}: any) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isShowNewPasswordNotif, setShowNewPasswordNotif] = useState(false);
  const [isShowConfirmPasswordNotif, setShowConfirmPasswordNotif] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const handleShowInfoAlert = () => {
    Alert.alert(
        "Информация",
        "На ваш почтовый адрес придет код для восстановления " +
        "пароля, не забывайте его, он вас любит :)",
        [{text: "Хорошо", style: "cancel"}]
    );
  };

  const handleChangePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      setShowNewPasswordNotif(true);
    } else {
      setShowNewPasswordNotif(false);
    }

    if (!confirmPassword) {
      setShowConfirmPasswordNotif(true);
    } else {
      setShowConfirmPasswordNotif(false);
    }

    if (!isShowNewPasswordNotif && !isShowConfirmPasswordNotif && confirmPassword === newPassword) {
      setLoading(true);
      dispatch(resetPassword(reset.email, newPassword))
          .then(() => setLoading(false))
          .catch(() => {
            Alert.alert(
                "Ошибка",
                "Произошла ошибка при восстановлении пароля, попробуйте еще раз",
                [{text: "Ок", style: "cancel"}]
            );
          });
    }
  };

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
          { isShowNewPasswordNotif ?
              <Text style={styles.alertNotif}>Пароль должен быть больше 6-ти символов</Text>
              :
              null
          }
          <TextInput
              style={[styles.input, styles.darkThemeBtn,
                isShowNewPasswordNotif ? {borderColor: 'red'} : null]}
              placeholderTextColor='#ffffff'
              placeholder="Новый пароль"
              onChangeText={setNewPassword}
          />
          { isShowConfirmPasswordNotif ?
              <Text style={styles.alertNotif}>Пожалуйста, заполните поле</Text>
              :
              null
          }
          <TextInput
              style={[styles.input, styles.darkThemeBtn,
                isShowConfirmPasswordNotif ? {borderColor: 'red'} : null]}
              placeholderTextColor='#ffffff'
              placeholder="Повторите новый пароль"
              onChangeText={setConfirmPassword}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleChangePassword} style={{width: '100%'}}>
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

const mapStateToProps = (state: any) => ({
  reset: state.reset,
});

export default connect(mapStateToProps)(ResetPasswordBlock);
