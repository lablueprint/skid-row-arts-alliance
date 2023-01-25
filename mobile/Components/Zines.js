import * as React from 'react';
import {
  Card, Title, Text,
} from 'react-native-paper';
import PropTypes from 'prop-types';

function Zines({ title, date }) {
  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Text>{date}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5b2d151112b13ff22782e9c7/1560779098985-P99PBXET5AP3AKSY1SIW/line+and+dot+creative+zines?format=1500w' }} />
    </Card>
  );
}

Zines.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Zines;
