import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function OrganizationDetailScreen({ route }) {
  const {
    organizations, summary, number, email, website,
  } = route.params;

  return (
    <View>
      <Text style={styles.h1}>{organizations}</Text>
      <Text>
        {' '}
        {summary}
        {' '}
      </Text>
      <Text>
        {' '}
        {number}
        {' '}
      </Text>
      <Text>
        {' '}
        {email}
        {' '}
      </Text>
      <Text>
        {' '}
        {website}
        {' '}
      </Text>
    </View>
  );
}

OrganizationDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      organizations: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default OrganizationDetailScreen;
