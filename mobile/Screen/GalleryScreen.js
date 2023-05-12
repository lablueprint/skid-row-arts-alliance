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
import {
  useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 4,
  },
  tagBox: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 20,
    backgroundColor: '#D0D0E8',
  },
  tagText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#424288',
  },
});

function GalleryScreen({ navigation, route }) {
  const [allImageData, setAllImageData] = useState([]);
  const [loadImages, setLoadImages] = useState(false);
  const selectedTags = route.params?.selectedTags || [];
  const tagLabels = selectedTags.map((tag) => tag.label);
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
    <ScrollView>
      <ScrollView
        horizontal
        contentContainerStyle={styles.tagContainer}
        showsHorizontalScrollIndicator={false}
      >
        {selectedTags.length > 0 && (
          selectedTags.map((tag) => (
            <View key={tag.id} style={styles.tagBox}>
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))
        )}
      </ScrollView>
      <ScrollView style={styles.scrollView}>
        {
        loadImages && (
          <>
            {
              (selectedTags.length === 0
                ? allImageData
                : allImageData
                  .filter((imageData) => imageData.SubmissionData.tags
                    .some((tag) => tagLabels.includes(tag))))
                .map((filteredData) => (
                  <ArtworkCard
                    ImageURL={filteredData.ImageURL}
                    id={filteredData.SubmissionData._id}
                    navigation={navigation}
                  />
                ))
            }
          </>
        )
      }
      </ScrollView>
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

export default GalleryScreen;
