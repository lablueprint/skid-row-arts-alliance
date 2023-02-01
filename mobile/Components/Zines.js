import * as React from 'react';
import {
  Card, Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

function Zines({ title, date, navigation }) {
  const onPressEvent = () => {
    navigation.navigate('Event Details');
  };

  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Text>{date}</Text>
      </Card.Content>
      <Button onPress={() => onPressEvent(navigation)}>Details</Button>
      <Card.Cover source={{ uri: 'https://images.squarespace-cdn.com/content/v1/5b2d151112b13ff22782e9c7/1560779098985-P99PBXET5AP3AKSY1SIW/line+and+dot+creative+zines?format=1500w' }} />
    </Card>
  );
}

Zines.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Zines;
