import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  FlatList,
} from "react-native";
import { useState } from "react";
import Avatar from "../common/Avatar";
import CommentsIcon from "react-native-vector-icons/Fontisto";
import Search from "react-native-vector-icons/EvilIcons";

export default function Event(props) {
  return (
    <View style={styles.containerEvents}>
      <View style={styles.eventContainer}>
        <View style={styles.eventInfos}>
          <Avatar size={40} />
          <View style={styles.appointmentInfos}>
            <Text style={styles.appointmentPlace}>
              {props.location} - {props.title}
            </Text>
            <Text style={styles.appointmentDate}>{props.date}</Text>
          </View>
        </View>
        <ImageBackground
          source={require("../../assets/image-film.webp")}
          imageStyle={{ opacity: 0.3 }}
          style={styles.backgroundDescriptionEvent}
        >
          <Text style={styles.descriptionText}>{props.description}</Text>
        </ImageBackground>
        <View style={styles.interactionBar}>
          <View style={styles.interactionToEventView}>
            <View style={styles.participants}>
              <Avatar style={styles.avatar1} size={30} />
              <Avatar style={styles.avatar2} size={30} />
              <Avatar style={styles.avatar3} size={30} />
            </View>
            <TouchableOpacity
              onPress={props.displayComments}
              style={styles.displayCommentsButton}
              activeOpacity={0.8}
            >
              <CommentsIcon name="comments" size={30} color={"#C94106"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={props.handleJoinEvent}
            style={styles.joingEventButton}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>+ Joindre</Text>
          </TouchableOpacity>
        </View>
          {props.showComments && (
            <View style={styles.commentsSection}>
              <Avatar></Avatar>
              {props.comments.map((comment, index) => (
                <Text key={index} style={styles.commentText}>
                  {comment.content}
                </Text>
              ))}
            </View>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerEvents: {},
  inputFilter: {
    backgroundColor: "rgba(77, 77, 77, 0.1)",
    width: "80%",
    height: 35,
    borderColor: "rgb(201, 65, 6)",
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 5,
    color: "white",
  },

  filterBar: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  eventContainer: {
    width: "90%",
    alignSelf: "center", // Centre horizontalement
    borderRadius: 10,
    elevation: 3, // Ombre pour Android
    shadowColor: "#000", // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "rgba(77, 77, 77, 0.5)",
    marginTop: 10,
    padding: 10,
    height: 250,
  },
  eventInfos: {
    flexDirection: "row",
  },
  appointmentInfos: {
    marginLeft: 10,
  },
  appointmentPlace: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
  appointmentDate: {
    color: "rgb(170, 170, 170)",
    fontSize: 16,
  },
  backgroundDescriptionEvent: {
    resizeMode: "cover",
    marginTop: 10,
  },
  descriptionText: {
    color: "white",
    fontSize: 18,
    padding: 10,
  },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  interactionToEventView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  participants: {
    flexDirection: "row",
  },
  joingEventButton: {
    backgroundColor: "rgb(201, 65, 6)",
    width: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  commentsSection: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  commentsTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 10,
    color: "white",
  },
});
