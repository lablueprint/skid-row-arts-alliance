import * as React from 'react';
import {
  StyleSheet, Text, ScrollView, Image,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    margin: 40,
  },
});

function ArtworkDetailScreen({
  route,
}) {
  const {
    title, Encoding, key, name, description, email,
  } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
        Title:
        {title}
      </Text>
      <Text>
        Name:
        {name}
        {'\n'}
        Description:
        {description}
        {'\n'}
        Email:
        {email}
      </Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: Encoding }}
      />
    </ScrollView>
  );
}

ArtworkDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
      Encoding: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ArtworkDetailScreen;
