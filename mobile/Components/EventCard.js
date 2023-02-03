import * as React from 'react';
import {
  Button, Card, Title, Paragraph,
} from 'react-native-paper';
import PropTypes from 'prop-types';

function EventCard({
  title, date, day, location, time, nonprofits, description, summary, navigation,
}) {
  const onPressEvent = () => {
    navigation.navigate('Event Details', {
      title,
      date,
      day,
      location,
      time,
      summary,
    });
  };

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Title style={{ fontSize: 25, fontWeight: 'bold' }}>
          Title:
          {' '}
          {title}
        </Title>
        <Paragraph>
          Date:
          {' '}
          {date}
        </Paragraph>
        <Paragraph>
          Time:
          {' '}
          {time}
        </Paragraph>
        <Paragraph>
          Location:
          {' '}
          {location}
        </Paragraph>
        <Paragraph>
          Nonprofits:
          {' '}
          {nonprofits}
        </Paragraph>
        <Paragraph>
          Description:
          {' '}
          {description}
        </Paragraph>
        <Paragraph>Tag0 | Tag1 | Tag2</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }} />
      <Card.Actions>
        <Button onPress={onPressEvent}>Details</Button>
        <Button>I&apos;m interested!</Button>
      </Card.Actions>
    </Card>
  );
}

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  nonprofits: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default EventCard;
