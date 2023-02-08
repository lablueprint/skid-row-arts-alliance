import React from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import ZineCard from '../Components/ZineCard';

const zinesCatalog = [
  { title: 'The Skid Row Arts Zine', date: 'Winter 2023', url: 'https://uploads-ssl.webflow.com/62564a02eebb830d646a956c/63cd7ceeb9a0710fa18cbace_ArtZine-Winter%202023-web-2.pdf' },
  { title: 'The Skid Row Arts Zine', date: 'Fall 2022', url: 'https://uploads-ssl.webflow.com/623c0bce7a7455588e8ad7ec/6355c1cfe410314aeb80cee9_ArtZine-Fall%202022-web-single%20pgs.pdf' },
  { title: 'The Skid Row Arts Zine', date: 'Summer 2022', url: 'https://uploads-ssl.webflow.com/62564a02eebb830d646a956c/62fb5c68936962d9134f1ee9_ArtZine-Summer%202022-web-v2.pdf' },
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

function ZinesScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      {zinesCatalog.map((book) => (
        <ZineCard
          navigation={navigation}
          title={book.title}
          date={book.date}
          url={book.url}
        />
      ))}
    </ScrollView>
  );
}

ZinesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ZinesScreen;
