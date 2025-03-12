import TextInputStyled from "../common/TextInput";
import Icon from "react-native-vector-icons/Ionicons";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";


export default function SearchAndFilterSection({ onSearch }) {

    const [search, setSearch] = useState("")

    // Barre de recherche par nom d'utilisateur
    const handleSearchChange = (text) => {
        setSearch(text);
        if (onSearch) {
            onSearch(text);
        }
    };

    const handleSearchButton = () => {
        if (onSearch) {
            onSearch(search);
        }
    }

    return (
        <View style={styles.searchSection}>
            <View style={{ flex: 5 }}>
                <TextInputStyled
                    value={search}
                    onChangeText={handleSearchChange}
                    placeholder='rechercher un utilisateur...'
                    onSubmitEditing={handleSearchButton}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: "row",
        padding: 10,
        gap: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 100,
    },
});