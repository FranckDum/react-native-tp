import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Modal, Image, StyleSheet, Button } from 'react-native'; // Import des composants et styles nécessaires depuis react-native
import { useSelector, useDispatch } from 'react-redux'; // Import de useSelector et useDispatch depuis react-redux pour accéder au state et dispatcher des actions
import { addFavorite, removeFavorite } from '../reducers/user'; // Import des actions addFavorite et removeFavorite depuis le reducer user
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Import de FontAwesomeIcon pour utiliser des icônes

// Déclaration du composant principal FilmsScreen
export default function FilmsScreen() {
    const [movies, setMovies] = useState([]); // Déclaration du state movies pour stocker les films
    const [isLoading, setIsLoading] = useState(true); // Déclaration du state isLoading pour gérer l'état de chargement
    const [selectedMovie, setSelectedMovie] = useState(null); // Déclaration du state selectedMovie pour stocker le film sélectionné
    const [modalVisible, setModalVisible] = useState(false); // Déclaration du state modalVisible pour contrôler la visibilité de la modal
    const dispatch = useDispatch(); // Utilisation de useDispatch pour dispatcher des actions
    const favorites = useSelector(state => state.user.value.favorites); // Utilisation de useSelector pour accéder à la liste des favoris dans le state

    // Effet de montage pour récupérer les films populaires depuis l'API
    useEffect(() => {
    const fetchPopularMovies = async () => {
        try {
        const response = await fetch(
            'https://api.themoviedb.org/3/movie/popular?language=fr&api_key=2bc57190d95ea5f7896a484856fd212b'
        );
        const data = await response.json();
        setMovies(data.results); // Mise à jour du state movies avec les données récupérées
        setIsLoading(false); // Mise à jour de isLoading à false une fois les données chargées
        } catch (error) {
        console.error('Erreur lors de la récupération des films : ', error); // Affichage de l'erreur en cas d'échec de récupération des films
        setIsLoading(false); // Mise à jour de isLoading à false en cas d'erreur
        }
    };

    fetchPopularMovies(); // Appel de la fonction pour récupérer les films populaires au montage du composant
    }, []);

    // Fonction pour gérer l'ajout ou la suppression d'un film aux favoris
    const handleLikePress = (movie) => {
    const isAlreadyLiked = favorites.some(item => item.id === movie.id); // Vérification si le film est déjà dans les favoris
    if (!isAlreadyLiked) {
        dispatch(addFavorite(movie)); // Ajout du film aux favoris s'il n'est pas déjà présent
    } else {
        dispatch(removeFavorite(movie.name)); // Suppression du film des favoris s'il est déjà présent
    }
    };

    // Fonction pour gérer le clic sur un film pour afficher ses détails
    const handleMoviePress = (movie) => {
    setSelectedMovie(movie); // Mise à jour du state selectedMovie avec le film sélectionné
    setModalVisible(true); // Affichage de la modal
    };

    // Fonction pour fermer la modal
    const closeModal = () => {
    setSelectedMovie(null); // Réinitialisation du state selectedMovie
    setModalVisible(false); // Cacher la modal
    };

    // Fonction pour afficher chaque carte de film dans la FlatList
    const renderMovieCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleMoviePress(item)}>
        <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        style={styles.cardImage}
        />
        <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleLikePress(item)}>
            <FontAwesomeIcon
            name={favorites.some(movie => movie.id === item.id) ? 'heart' : 'heart-o'}
            size={30}
            color={favorites.some(movie => movie.id === item.id) ? 'red' : 'black'}
            />
        </TouchableOpacity>
        </View>
    </TouchableOpacity>
    );

    // Affichage de l'indicateur de chargement si isLoading est true
    if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Affichage du contenu principal du composant
    return (
    <View style={{ flex: 1 }}>
        <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        />

        <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Détails du film :</Text>
            {selectedMovie && (
            <View>
                <Text>Titre : {selectedMovie.title}</Text>
                <Text>VO : {selectedMovie.original_language}</Text>
                <Text>Popularité : {selectedMovie.popularity}</Text>
                <Text>Description : {selectedMovie.overview}</Text>
                <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}` }}
                style={{ width: 200, height: 300 }}
                />
                <Button title="Fermer" onPress={closeModal} />
            </View>
            )}
        </View>
        </Modal>
    </View>
    );
}

// Styles du composant
const styles = StyleSheet.create({
    container: {
    padding: 10, // Ajoute un padding de 10 points autour du contenu de la FlatList
    },
    card: {
    backgroundColor: '#fff', // Couleur de fond de la carte
    marginBottom: 10, // Marge inférieure de 10 points entre les cartes
    borderRadius: 8, // Bordure arrondie de la carte
    shadowColor: '#000', // Couleur de l'ombre de la carte
    shadowOffset: {
        width: 0,
        height: 2, // Décalage vertical de l'ombre
    },
    shadowOpacity: 0.25, // Opacité de l'ombre
    shadowRadius: 3.84, // Rayon de l'ombre
    elevation: 5, // Élévation de la carte
    },
    cardImage: {
    width: '100%', // Largeur de l'image à 100% de la largeur de la carte
    height: 200, // Hauteur de l'image
    borderTopLeftRadius: 8, // Bordure arrondie en haut à gauche
    borderTopRightRadius: 8, // Bordure arrondie en haut à droite
    },
    cardContent: {
    padding: 10, // Ajoute un padding de 10 points autour du contenu de la carte
    flexDirection: 'row', // Affichage en ligne des éléments à l'intérieur de la carte
    justifyContent: 'space-between', // Répartition de l'espace entre les éléments
    alignItems: 'center', // Alignement vertical des éléments
    },
    cardTitle: {
    fontSize: 18, // Taille de la police de caractères du titre
    fontWeight: 'bold', // Poids de la police de caractères en gras
    },
});
