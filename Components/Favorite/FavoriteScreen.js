import React from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import RecipeBox from '../Home_Screen/RecipeBox';
import { faV } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const FavoriteScreen = ({navigation}) => {
    const favoriteRecipes = useSelector((state) => state.favoriteRecipes);

    return (
        <SafeAreaView style={favStyles.screen}>
            <View style={favStyles.heading}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeSearch')} activeOpacity={0.5}>
                    <Image source={require('../../assets/arrow.png')}/>
                </TouchableOpacity>
                <Text style={favStyles.title}>FAVORITES</Text>
                <View />
            </View>
            <FlatList data={favoriteRecipes} renderItem={({item}) => <RecipeBox recipe={item} isFavorite={true} recipeName={item?.title} image={item?.image} keyExtractor={(item) => item?.id?.toString()} />}  ItemSeparatorComponent={() => null} style={favStyles.list} />
        </SafeAreaView>
        
    );
}

const favStyles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        flex: 1,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 20,
        width: '100%',
        paddingBottom: 25,
    },
    title: {
        fontSize: 30,
        fontFamily: 'OPTIFuturaDemiBold',
        letterSpacing: 2,
        color: '#9F4D31',
        
    },
    list: {
    },
}); 

export default FavoriteScreen;