import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../reducers/user';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FavorisScreen() {
  // Récupération de la liste des favoris depuis le state
  const favorites = useSelector(state => state.user.value.favorites);
  // Utilisation de useDispatch pour dispatcher des actions
  const dispatch = useDispatch();
  // Déclaration du state selectedMovie pour stocker le film sélectionné
  const [selectedMovie, setSelectedMovie] = useState(null);
  // Déclaration du state modalVisible pour contrôler la visibilité de la modal
  const [modalVisible, setModalVisible] = useState(false);

  // Fonction pour gérer le clic sur un film pour afficher ses détails
  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setSelectedMovie(null);
    setModalVisible(false);
  };

  // Fonction pour supprimer un favori
  const handleRemoveFavorite = (movieName) => {
    dispatch(removeFavorite(movieName));
    setModalVisible(false); // Fermer la modal après la suppression
  };

  // Fonction pour rendre chaque élément dans la FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem} onPress={() => handleMoviePress(item)}>
      {/* Mise en place d'un TouchableOpacity pour détecter les clics sur chaque élément */}
      <Text style={styles.movieTitle}>{item.title}</Text>
      {/* Affichage du titre du film */}
      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFavorite(item.name)}>
        {/* Bouton pour supprimer le film de la liste des favoris */}
        <Icon name="trash" size={20} color="red" />
        {/* Icône pour supprimer le favori */}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Affichage du contenu principal du composant
  return (
    <View style={styles.container}>
      {/* Mise en place d'une vue principale avec styles flexibles */}
      <FlatList
        data={favorites}
        // Passage de la liste des favoris à la FlatList
        renderItem={renderItem}
        // Rendu de chaque élément de la liste en utilisant la fonction renderItem
        keyExtractor={item => item.id.toString()}
        // Extrait une clé unique pour chaque élément de la liste
      />

      {/* Modal pour afficher les détails du film sélectionné */}
      <Modal
        animationType="slide"
        // Type d'animation de la modal
        transparent={false}
        // Modal non transparente
        visible={modalVisible}
        // Visibilité de la modal contrôlée par le state modalVisible
        onRequestClose={closeModal}
        // Fonction à appeler lorsque l'utilisateur tente de fermer la modal
      >
        <View style={styles.modalContainer}>
          {/* Mise en place d'une vue principale avec styles flexibles */}
          <Text style={styles.modalTitle}>Détails du film :</Text>
          {/* Affichage d'un titre pour les détails du film */}
          {selectedMovie && (
            // Vérification si un film est sélectionné
            <View>
              <Text>Titre : {selectedMovie.title}</Text>
              {/* Affichage du titre du film sélectionné */}
              <Text>VO : {selectedMovie.original_language}</Text>
              {/* Affichage du titre du film sélectionné */}
              <Text>Popularité : {selectedMovie.popularity}</Text>
              {/* Affichage du titre du film sélectionné */}
              <Text>Description : {selectedMovie.overview}</Text>
              {/* Affichage de la description du film sélectionné */}
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}` }}
                style={styles.posterImage}
                // Source de l'image à partir de l'URL
              />
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
              {/* Bouton pour fermer la modal */}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  movieItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  removeButton: {
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  posterImage: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
