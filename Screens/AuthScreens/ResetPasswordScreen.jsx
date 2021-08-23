import React, {FunctionComponent, useEffect, useRef} from "react";
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Animated,
    StyleSheet,
} from "react-native";

import SendCodeBlock from "./Components/SendCodeBlock";
import ResetPasswordBlock from "./Components/ResetPasswordBlock";

import {LinearGradient} from "expo-linear-gradient";
import {connect} from "react-redux";

const ResetPasswordScreen = ({reset}) => {
    const startScaleValue = useRef(new Animated.Value(1.25)).current;
    const endScaleValue = 1.4;

    useEffect(() => {
        Animated.loop(Animated.spring(startScaleValue, {
            toValue: endScaleValue,
            friction: 1,
            useNativeDriver: true,
        }), {iterations: 1}).start();
    }, [startScaleValue, endScaleValue]);

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
              <SafeAreaView style={[styles.background, styles.darkBackground]}>
                  {reset.isChecked ? <ResetPasswordBlock /> : <SendCodeBlock />}
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
}

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
});

const mapStateToProps = (state) => ({
    reset: state.reset,
});

export default connect(mapStateToProps)(ResetPasswordScreen);
