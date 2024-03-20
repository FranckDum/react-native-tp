import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handlePress = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.trim()) {
            setError("L'adresse email ne peut pas être vide");
            return;
        } else if (regex.test(email)) {
            navigation.navigate('TabNavigator', { screen: 'Films' });
            setEmail('');
            setError('');
        } else {
            setError('Veuillez entrer une adresse email valide');
        }
    };

    return (
        <ImageBackground source={require('../assets/background_image.jpg')} style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.title}>FraMovies</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={(value) => setEmail(value)}
                        value={email}
                        placeholderTextColor="#999"
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                    <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
                        <Text style={styles.textButton}>Explorer les films populaires</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 40,
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 15,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#e8be4b',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
