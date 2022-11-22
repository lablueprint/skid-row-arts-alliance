/* eslint-disable */

import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';


const ArtSubmissionTextInput = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState('');
  const [accountTag, setAccountTag] = useState('');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View>
      <TextInput
        styles={styles.input}
        placeholder='Name'
        onChangeText={newName => setName(newName)}
        defaultValue={name}
      />
      <TextInput
        styles={styles.input}
        placeholder='Email'
        onChangeText={newEmail => setEmail(newEmail)}
        defaultValue={email}
      />
      <TextInput
        styles={styles.input}
        placeholder='Social Media Platform'
        onChangeText={newPlatform => setPlatform(newPlatform)}
        defaultValue={platform}
      />
      <TextInput
        styles={styles.input}
        placeholder='Social Media Account Tag'
        onChangeText={newEmail => setAccountTag(newEmail)}
        defaultValue={accountTag}
      />
      <TextInput
        styles={styles.input}
        placeholder='Artwork Title'
        onChangeText={newArtwork => setArtworkTitle(newArtwork)}
        defaultValue={artworkTitle}
      />
      <TextInput
        styles={styles.input}
        placeholder='Artwork Description'
        onChangeText={newDescription => setDescription(newDescription)}
        defaultValue={description}
      />
      <Button 
        title="Submit"
      />
      <Button
        title="Load Gallery" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ArtSubmissionTextInput;
