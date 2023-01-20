import React from 'react';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default SignUpScreen;
