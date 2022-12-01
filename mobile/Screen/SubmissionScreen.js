import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import ArtSubmissionTextInput from '../Components/ArtSubmissionTextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});

function SubmissionScreen() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await axios.get(`${URL}/submissions/get`);
      setSubmissions(result.data);
    };
    load().catch(console.error);
  }, []);

  console.log(1, submissions);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {submissions.map((submission) => (
            <View>
              <Text>{submission.name}</Text>
              <Text>{submission.email}</Text>
              <Text>{submission.socials.platform}</Text>
              <Text>{submission.socials.tag}</Text>
              <Text>{submission.title}</Text>
              <Text>{submission.description}</Text>
            </View>
          ))}
        </View>
        <ArtSubmissionTextInput />
      </View>
    </ScrollView>
  );
}

export default SubmissionScreen;
