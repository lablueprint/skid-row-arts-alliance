import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

function ProfileScreen() {
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [platform, setPlatform] = React.useState("");
  const [tag, onChangeTag] = React.useState("");

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Picker
          selectedValue={platform}
          onValueChange={(currentPlatform) => setPlatform(currentPlatform)}
        >
          <Picker.Item label="Facebook" value="Facebook" />
          <Picker.Item label="Instagram" value="Instagram" />
          <Picker.Item label="Twitter" value="Twitter" />
        </Picker>
        <TextInput
          placeholder="Account Tag"
          onChangeText={onChangeTag}
          value={tag}
        />
      </View>
    </View>
  );
}

export default ProfileScreen;
