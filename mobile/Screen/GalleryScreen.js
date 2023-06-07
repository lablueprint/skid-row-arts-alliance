import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '@env';
import PropTypes from 'prop-types';
import {
  useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import ArtworkCard from '../Components/ArtworkCard';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 35,
    paddingBottom: 15,
  },
  headerText: {
    justifyContent: 'center',
    marginLeft: 20,
    fontFamily: 'MontserratSemiBold',
    fontSize: 28,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#424288',
    borderRadius: 5,
    alignSelf: 'center',
    paddingHorizontal: 17,
    paddingVertical: 7,
    marginRight: 20,
  },
  filterImage: {
    width: 16,
    height: 16,
  },
  filterText: {
    fontFamily: 'MontserratSemiBold',
    color: '#424288',
    marginLeft: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 4,
    marginTop: '4%',
    marginBottom: '4%',
  },
  tagBox: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#D0D0E8',
  },
  tagText: {
    fontFamily: 'MontserratSemiBold',
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
  const { authHeader } = useSelector((state) => state.auth);

  const getAllSubmissions = async () => {
    try {
      setLoadImages(false);
      const res = await axios.get(`${URL}/submissions/getthumbnails`, {
        headers: authHeader,
      });
      console.log(res.data);
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

  let filteredData = allImageData;
  if (loadImages && selectedTags.length > 0) {
    filteredData = filteredData.filter((imageData) => imageData.SubmissionData.tags
      .some((tag) => tagLabels.includes(tag)));
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gallery</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Artwork Filter', { selectedTags })}>
          <View style={styles.filterButton}>
            <Image
              source={require('../assets/filter/filter.png')}
              style={styles.filterImage}
            />
            <Text style={styles.filterText}>Filter</Text>
          </View>
        </TouchableOpacity>
      </View>
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
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.SubmissionId}
        numColumns={2}
        renderItem={({ item }) => (
          <ArtworkCard
            ImageURL={item.ImageURL}
            id={item.SubmissionId}
            navigation={navigation}
          />
        )}
        style={styles.galleryContainer}
      />
    </SafeAreaView>
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
