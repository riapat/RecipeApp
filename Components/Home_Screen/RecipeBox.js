import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../Favorite/FavoriteRecipeSlice';
//get background from API

const screenHeight = Dimensions.get('window').height;


const RecipeBox = (props) => {
    const { image, recipe } = props;

    const navigation = useNavigation();

    const dispatch = useDispatch();

    // const isFavorite = useSelector((state) => state.favoriteRecipes.includes(recipe));

    const favoriteRecipes = useSelector((state) => state.favoriteRecipes);

    const isFavorite = favoriteRecipes.some((favoriteRecipe) => favoriteRecipe.id === recipe.id);




    return(
        <TouchableOpacity style={boxStyles.container} onPress={
            () => navigation.navigate('RecipeInfo', {recipeName: props.recipeName, image: image, recipe: recipe, isFavorite})}>
            <ImageBackground source={{ uri: image }} style={boxStyles.backgroundImage}>
                <View style={boxStyles.overlay}>
                    <View style={boxStyles.topDescription}>
                        <View />
                        <TouchableOpacity onPress={() => {
                            if (isFavorite) {
                                console.log('Want to remove', recipe);
                                dispatch(removeFavoriteRecipe(recipe));
                            } else {
                                console.log('Want to add', recipe);

                                dispatch(addFavoriteRecipe(recipe));
                            }

                        }}>
                            {isFavorite ? (<Image source={require('../../assets/filled.png')} style={boxStyles.image}/>) : 
                            (<Image source={require('../../assets/unfilled.png')} style={boxStyles.image}/>)}
                            
                        </TouchableOpacity>
                    </View>
                    <View style={boxStyles.bottomDescription} >
                        <Text style={boxStyles.recipeName } numberOfLines={1} ellipsizeMode="tail">{props.recipeName}</Text>
                    </View>
                </View>
                
            </ImageBackground>
        </TouchableOpacity>
    );
}

const boxStyles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 20,
        margin: 5,
        paddingHorizontal: 5,
        width: '95%',
        alignSelf:'center',
    },
    backgroundImage: {
        resizeMode: 'cover',
        flex: 1,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.25)', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    cuisine: {
        fontSize: 21,
        color: '#FFF',
        fontFamily: 'intrepid',
    },
    topDescription: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingTop: 10,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 50,

        
    },
    bottomDescription: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        width: '100%',
        paddingBottom: 5,
    },
    recipeName: {
        fontSize: 24,
        color: '#FFF',
        fontFamily: 'intrepid',
        alignSelf: 'flex-start',
        // paddingTop: '21%',
        width: '100%',
        height: 27,

    },
    image: {
        width: 27,
        height: 27,
        alignSelf: 'flex-end',

    }
    
    
});

export default RecipeBox;