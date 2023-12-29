import React, {useEffect} from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import RecipeBox from './RecipeBox';
import { useDispatch, useSelector} from 'react-redux';
import { fetchTags } from '../../FetchTags';
import { setSelectedFilter } from './FilterAction';
import {favoriteRecipes } from '../Favorite/FavoriteRecipeSlice';
import {createSelector} from 'reselect';



//Dairy Free can be added later
const filters = ["ALL","VEGETARIAN", "VEGAN", "GLUTEN-FREE", "HEALTHY"]

const selectTagsData = (state) => state.tags.data;
const selectTags = createSelector(
  [selectTagsData],
  (data) => data?.results || []
);

// HomeSearch is the screen that displays the search results
console.log("HomeSearch");

const HomeSearch = ({navigation}) => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);
  console.log(JSON.stringify(tags));

  const favoriteRecipes = useSelector((state) => state.favoriteRecipes);


  return (
        <SafeAreaView style={homeStyle.screen}>
            <View style={homeStyle.heading}>
                <Text style={homeStyle.title}>SEARCH</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('FavoriteScreen')}>
                  <Image source={require('../../assets/greennavstar.png')} style={homeStyle.navstar} /> 
                </TouchableOpacity>
            </View>
            
            
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, flexWrap: 'wrap',}}>
                {filters.map((filter) => <TouchableOpacity key={filter} style={homeStyle.button} onPress={() => {
                  if (filter == "VEGETARIAN") {
                    dispatch(fetchTags("vegetarian"));
                  } else if (filter == "VEGAN") {
                    dispatch(fetchTags("vegan"));
                  } else if (filter == "GLUTEN-FREE") {
                    dispatch(fetchTags("gluten-free"));
                  } else if (filter == "HEALTHY") {
                    dispatch(fetchTags("healthy"));
                  // } else if (filter == "DAIRY FREE"){
                  //   dispatch(fetchTags("nodairy"));
                  } else {
                    dispatch(fetchTags(""));
                  }
                  console.log("filter", filter);
                }}>
                        
                        <Text style={homeStyle.buttonText}>{filter}</Text>
                    </TouchableOpacity>)}
            </View>
            <View style={homeStyle.divider} />          
            <FlatList data={tags} renderItem={({item}) => <RecipeBox recipe = {item} recipeName={item.title} image={item.image} isFavorite={favoriteRecipes.includes(item)} keyExtractor={(item) => item.id.toString()}/>} ItemSeparatorComponent={() => null} />
        </SafeAreaView>
    );
};

const homeStyle = StyleSheet.create({
    button: {
        backgroundColor: '#506D05',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 3,
        marginVertical: 5,
        paddingHorizontal: 13,
    },
    screen: {
      flexDirection: 'column',
      flex: 1,
    },
    heading: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginTop: 20,
      paddingHorizontal: 20,
      width: '100%',
      paddingBottom: 10,
  },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'intrepid',
        fontSize: 18,
        letterSpacing: 1,
    },
    divider: {
        borderBottomColor: '#506D05',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    title: {
        color: '#9F4D31',
        fontFamily: 'OPTIFuturaDemiBold',
        fontSize: 40,
        letterSpacing: 1,
        textAlign: 'center',
    },
    blackOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingVertical: 30,
    },
});

export default HomeSearch;