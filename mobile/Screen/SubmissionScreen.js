import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ArtSubmissionTextInput from '../Components/ArtSubmissionTextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function SubmissionScreen() {
  return (
    <View style={styles.container}>
      <ArtSubmissionTextInput />
    </View>
  );
}

export default SubmissionScreen;
