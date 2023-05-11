import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { URL } from '@env';
import PropTypes from 'prop-types';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ArtworkCard from '../Components/ArtworkCard';

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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#424288',
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterImage: {
    width: 16,
    height: 16,
  },
  filterText: {
    fontFamily: 'MontserratSemiBold',
    color: '#424288',
    fontSize: 17,
    marginLeft: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginVertical: 20,
  },
  tagBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 15,
    backgroundColor: '#D0D0E8',
  },
  tagText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: '#424288',
  },
});

function GalleryScreen({ navigation, route }) {
  const [allImageData, setAllImageData] = useState([]);
  const [loadImages, setLoadImages] = useState(false);
  const selectedTags = route.params?.selectedTags || [];
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  const getAllSubmissions = async () => {
    try {
      setLoadImages(false);
      const res = await axios.get(`${URL}/submissions/get`);
      setAllImageData(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      return err;
    } finally {
      setLoadImages(true);
    }
  };

  useEffect(() => {
    getAllSubmissions();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <TouchableOpacity onPress={() => navigation.navigate('Artwork Filter')}>
        <View style={styles.filterButton}>
          <Image
            source={require('../assets/filter/filter.png')}
            style={styles.filterImage}
          />
          <Text style={styles.filterText}>Filter</Text>
        </View>
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={styles.tagContainer}
        showsHorizontalScrollIndicator={false}
      >
        {selectedTags.length > 0 && (
          selectedTags.map(tag => (
            <View key={tag.label} style={styles.tagBox}>
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))
        )}
      </ScrollView>
      {
        loadImages && (
          <>
            {
              allImageData.map((imageData) => (
                <ArtworkCard
                  ImageURL={imageData.ImageURL}
                  id={imageData.SubmissionData._id}
                  navigation={navigation}
                />
              ))
            }
          </>
        )
      }
    </ScrollView>
  );
}

GalleryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      selectedTags: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
      })),
    }),
  }).isRequired,
};

GalleryScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Artwork Filter')} style={styles.filterButton}>
      <Text>Filter</Text>
    </TouchableOpacity>
  ),
});

export default GalleryScreen;
