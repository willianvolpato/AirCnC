import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            setTechs(storagedTechs.split(',').map(tech => tech.trim()));
        })
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
});