import React, { useState } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button, Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function SignUpScreen({ navigation }) {
  const [text, onChangeText] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [socialTag, onChangeSocialTag] = React.useState('');
  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Social Media Platform
        </Text>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 220, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Instagram" value="instagram" />
          <Picker.Item label="Twitter" value="twitter" />
          <Picker.Item label="Facebook" value="facebook" />
        </Picker>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>
          Social Media Tag
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSocialTag}
          value={socialTag}
        />
      </View>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default SignUpScreen;
