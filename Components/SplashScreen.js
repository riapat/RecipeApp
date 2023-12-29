import React, {useEffect} from 'react';
import { ImageBackground, View, Image, StyleSheet, Text, ActivityIndicator } from 'react-native';
import background from '../assets/Launch.png';

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomeSearch');
        }, 3000);
    }, []);
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>FlavorFinds</Text>
                <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 16 }} />
            </ImageBackground>
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(${background})',
    },
    image: {
        flex:1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'OPTIFuturaDemiBold',
    }
});

export default SplashScreen;