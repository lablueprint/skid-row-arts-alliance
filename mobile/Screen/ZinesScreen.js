import React from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import Zines from '../Components/Zines';

const zinesCatalog = [
  { title: 'Poogers', date: 'Poogers' },
  { title: 'Pooger', date: 'Pooger' },
  { title: 'Pooge', date: 'Pooge' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    padding: 20,
  },
});

function ZinesScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      {zinesCatalog.map((book) => (
        <Zines
          title={book.title}
          date={book.date}
        />
      ))}
    </ScrollView>
  );
}

export default ZinesScreen;
