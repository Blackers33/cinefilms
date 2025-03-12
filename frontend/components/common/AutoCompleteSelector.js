import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import TextInputStyled from "./TextInput";
import { useState } from "react";

const placeholders = {
    city: "Chercher une ville",
};

const paths = (text) => {
    return {
        city: `https://api-adresse.data.gouv.fr/search/?q=${text}&type=municipality&limit=5`,
    };
};

export default function AutoCompleteSelector( props ) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [choices, setChoices] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (text) => {
        if (text.length < 3) {
            setOpen(false);
            return;
        }

        setLoading(true);
        setOpen(false);

        try {
            const response = await fetch(paths(text)[props.type]);
            const data = await response.json();
            const results = data.features.map((item) => ({
                key: item.properties.id,
                value: item.properties.label,
            }));

            setChoices(results);
            setOpen(results.length > 0);
        } catch (error) {
            console.error("Erreur lors du fetch :", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (item) => {
        setSearch(item.value);
        setOpen(false);
        props?.onSubmitEditing(item.value);
    };

    return (
        <View style={{ flex: 5,  position: "relative" }}>
            <TextInputStyled
                value={search}
                onChangeText={(text) => {
                    setSearch(text);
                    fetchData(text);
                }}
                placeholder={placeholders[props.type]}
                onSubmitEditing={props?.onSubmitEditing}
            />
            {loading && <ActivityIndicator size="small" color="#007BFF" style={{ marginTop: 5 }} />}
            {open && (
                <View
                    style={{
                        position: "absolute",
                        top: 50,
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingVertical: 5,
                        zIndex: 1000, // Assure que la liste est au-dessus
                        elevation: 5,
                    }}
                >
                    <FlatList
                        data={choices}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelect(item)}
                                style={{
                                    padding: 12,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ddd",
                                }}
                            >
                                <Text style={{ fontSize: 16, color: "#333" }}>{item.value}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
}
