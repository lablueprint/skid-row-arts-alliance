import * as React from 'react';
import {
  Button, Card, Title, Paragraph,
} from 'react-native-paper';

function MapEvent({title, date, location, nonprofits, description, navigation}) {

  const onPressEvent = (navigation) => {
    navigation.navigate('Event Details');
  }

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Title style={{ fontSize: 25, fontWeight: 'bold' }}>Title: {title}</Title>
        <Paragraph>Date: {date}</Paragraph>
        <Paragraph>Location: {location}</Paragraph>
        <Paragraph>Nonprofits: {nonprofits}</Paragraph>
        <Paragraph>Description: {description}</Paragraph>
        <Paragraph>Tag0 | Tag1 | Tag2</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }} />
      <Card.Actions>
        <Button onPress={()=>onPressEvent(navigation)} >Details</Button> 
        <Button >I&apos;m interested!</Button>
      </Card.Actions>
    </Card>
  );
}


export default MapEvent;

