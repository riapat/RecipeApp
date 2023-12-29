import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setFetchedIngredients } from './IngredientSlice';
import { setFetchedInstructions } from './InstructionSlice';
import { setFetchedAdditionals } from './AdditionalSlice';
import { addFavoriteRecipe, removeFavoriteRecipe } from '../Favorite/FavoriteRecipeSlice';

import { fetchIngredients } from '../../FetchIngredients';
import { fetchInstructions } from '../../FetchInstructions';
import { fetchAdditionals } from '../../FetchAdditionals';

const screenHeight = Dimensions.get('window').height;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// navigation
const RecipeInfo = ({ route }) => {
    
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { recipeName, image, recipe, isFavorite } = route.params;
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [additionals, setAddiionals] = useState([]);

    const favoriteRecipes = useSelector((state) => state.favoriteRecipes);

    const isFavoritedInfo = favoriteRecipes.some((favoriteRecipe) => favoriteRecipe.id === recipe.id);

    useEffect(() => {
        dispatch(fetchIngredients(recipe.id))
            .then((action) => {
                if (fetchIngredients.fulfilled.match(action)) {
                    setIngredients(action.payload.data.ingredients);
                }
            });
        dispatch(fetchInstructions(recipe.id))
            .then((action) => {
                if (fetchInstructions.fulfilled.match(action)) {
                    setInstructions(action.payload.data[0].steps);
                }
            });  
        dispatch(fetchAdditionals(recipe.id))
            .then((action) => {
                if (fetchAdditionals.fulfilled.match(action)) {
                    setAddiionals(action.payload.data);
                }
            });     
    }, [dispatch, recipe.id]);


    return (
        <SafeAreaView style={{flexDirection: 'column', flex: 1,}}>
            <ScrollView>
                <ImageBackground source={{ uri: image}} style={[infoStyle.image, { height: screenHeight * 0.33 }]}>
                    <View style={infoStyle.overlay}>
                        <View style={infoStyle.heading}>
                            <TouchableOpacity  activeOpacity={0.5} onPress={() => navigation.goBack()}> 
                                <Image source={require('../../assets/whitearrow.png')}/>
                            </TouchableOpacity>
                            <View />
                            <TouchableOpacity onPress={() => {
                                if (isFavoritedInfo) {
                                    dispatch(removeFavoriteRecipe(recipe));
                                } else {
                                    dispatch(addFavoriteRecipe(recipe));
                                }

                            }}>
                                {isFavoritedInfo ? (<Image source={require('../../assets/filled.png')} style={infoStyle.star}/>) : 
                                (<Image source={require('../../assets/unfilled.png')} style={infoStyle.star}/>)}
                            </TouchableOpacity>
                        </View>
                        <View />
                        <Text style={infoStyle.title}>{recipeName}</Text>
                    </View> 
                </ImageBackground>

                <Text style={infoStyle.topAdditional}>SERVINGS: {additionals.servings}</Text>
                <Text style={infoStyle.additional}>EAT IN {additionals.readyInMinutes} MINUTES</Text>

                <Text style={infoStyle.subheading}>INGREDIENTS</Text>
                {ingredients?.map((ingredient, index) => (<Text key={index} style={infoStyle.ingredient}> • {capitalizeFirstLetter(ingredient.name)} : {ingredient.amount.us.value} {ingredient.amount.us.unit} </Text>))}
                
                <Text style={infoStyle.subheading}>INSTRUCTIONS</Text>
                {instructions?.map((instruction, index) => (<Text key={index} style={infoStyle.ingredient}> {instruction.number}. {instruction.step} </Text>))}

                <View style={infoStyle.finaleCover}>
                    <Text style={infoStyle.finale}>Enjoy the flavors!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
}

const infoStyle = StyleSheet.create({
    image: {
        resizeMode: 'cover',
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    star: {
        width: 30,
        height: 30,
        alignSelf: 'flex-end',
    },
    title: {
        fontSize: 35,
        color: '#FFF',
        fontFamily: 'OPTIFuturaDemiBold',
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 30,
        textAlign: 'center',
        paddingTop: 25,
    },
    subheading: {
        fontSize: 27,
        color: '#000',
        fontFamily: 'OPTIFuturaDemiBold',
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 15,
        textDecorationLine: 'underline',
    }, 
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.45)', 
        justifyContent: 'flex-start',  
        height: screenHeight * 0.33,
        alignItems: 'center',
    },
    ingredient: {
        fontSize: 20,
        color: '#000',
        fontFamily: 'intrepid',
        alignSelf: 'flex-start',
        marginVertical: 7,
        marginHorizontal: 20,
    },
    finale: {
        fontSize: 35,
        color: '#FFFFFF',
        fontFamily: 'OPTIFuturaDemiBold',
        alignSelf: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    finaleCover: {
        width: '100%',
        backgroundColor: '#506D05',
        alignItems: 'center',
        marginTop: 15,
        
    },
    additional: {
        fontSize: 21,
        color: '#000',
        fontFamily: 'intrepid',
        alignSelf: 'flex-start',
        marginVertical: 3,
        marginHorizontal: 20,
    },
    topAdditional: {
        fontSize: 21,
        color: '#000',
        fontFamily: 'intrepid',
        alignSelf: 'flex-start',
        marginHorizontal: 20,
        marginTop: 20,
    }
});

export default RecipeInfo;