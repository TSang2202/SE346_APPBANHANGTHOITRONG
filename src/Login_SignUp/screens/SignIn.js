import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import HeaderWithBack from '../components/Header/HeaderWithBack.js';
import CustomButton from '../components/Buttons/CustomButton.js';
import TextInputCard from '../components/Cards/TextInputCard.js';
import PasswordCard from '../components/Cards/PasswordCard.js';
import HeaderTitlle from '../components/Header/HeaderTitlle.js';
import HederContent from '../components/Header/HederContent.js';
import CUSTOM_COLOR from '../constants/colors.js';
import FONT_FAMILY from '../constants/fonts.js';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '../../../Firebase/firebase.js';

const SignIn = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack onPress={() => navigation.goBack()} />
      <View style={[styles.unitContainer, {height: 100}]}>
        <HeaderTitlle title="Sign in" />
      </View>

      <View style={[styles.unitContainer, styles.bodyContainer]}>
        <View style={{flex: 2}}>
          <TextInputCard
            title="Email*"
            txtInput="abc@gmail.com"
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
          />
        </View>

        <View style={{flex: 2}}>
          <PasswordCard
            title="Pasword*"
            txtInput="********"
            onChangeText={password => setPassword(password)}
          />
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.contentStyle}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerBot}>
        <View style={styles.button}>
          <CustomButton
            type="primary"
            text="Sign in"
            onPress={() => loginUser(email, password)}
            // onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>

      <View style={[styles.unitContainer, styles.botContainer]}>
        <View
          style={{flex: 5, justifyContent: 'center', alignItems: 'flex-end'}}>
          <HederContent content="Don't you have an account ? " />
        </View>
        <View
          style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.contentStyle}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  bodyContainer: {
    height: 270,
    top: '0%',
    flexDirection: 'column',
  },
  containerBot: {
    width: '100%',
    height: '10%',
    bottom: '-3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  botContainer: {
    height: '15%',
    bottom: '0%',
    flexDirection: 'row',
  },
  contentStyle: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});
export default SignIn;
