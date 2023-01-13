import * as React from 'react';
import {
  Button, Card, Title, Paragraph,
} from 'react-native-paper';

function MapEvent(event) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Title style={{ fontSize: 25, fontWeight: 'bold' }}>Title: {event.title}</Title>
        <Paragraph>Date: {event.date}</Paragraph>
        <Paragraph>Location: {event.location}</Paragraph>
        <Paragraph>Nonprofits: {event.nonprofits}</Paragraph>
        <Paragraph>Description: {event.description}</Paragraph>
        <Paragraph>Tag0 | Tag1 | Tag2</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }} />
      <Card.Actions>
        <Button>Details</Button>
        <Button>I&apos;m interested!</Button>
      </Card.Actions>
    </Card>
  );
}

/*const Stack = createStackNavigator();

const myStack = () => {
  return(
    <Stack.navigator>
      <Stack.Screen name="Details" component={MapEvent}/>
    </Stack.navigator>
  );
}
 */

export default MapEvent;

