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
import Comments from "./comments";
import CommentsIcon from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { formatDistanceToNow, fr } from "date-fns";


export default function Event(props) {
 
const avatars = props.participants.map((participant, index) => (
  <Avatar
    uri={participant.avatar} 
    key={index}
    style={{ marginRight: 5 }}
    size={30}
  />
));


const avatarjoint = props.isParticipate ? (
  <Avatar
    uri={props.avatar} 
    key="user-avatar"
    style={{ marginRight: 5 }}
    size={30}
  />
) : null;



  return (
    <View style={styles.eventContainer}>
      <View style={styles.eventInfos}>
        <Avatar size={40} uri={props.avatareventowner}/>
        <View style={styles.appointmentInfos}>
          <Text style={styles.appointmentPlace}>
            {props.location} - {props.title}
          </Text>
          <Text style={styles.appointmentDate}>{props.date}</Text>
        </View>
        <View >
          <Text style={styles.titlefilm}>{props.titleFilm}</Text>
          <Image
            style={styles.imageFilm}
            source={{
              uri: props.backdrop,
            }}
          />
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
            {avatars}
            {avatarjoint}
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
          style={styles.joingEventButton}
          activeOpacity={0.8}
          onPress={props.handleJoinEvent}
        >
          {props.isParticipate ? (
            <Text style={styles.buttonText}>Quitter</Text>
          ) : (
            <Text style={styles.buttonText}>+ Joindre</Text>
          )}
        </TouchableOpacity>
      </View>
      {props.showComments && (
        <View style={styles.commentsSection}>
          <Comments
          comments={props.comments}
          ></Comments>

          <View style={styles.inputcommentcontaire}>
            <TextInput
              style={styles.inputcomment}
              placeholder="écrire un commentaire"
              value={props.comment}
              onChangeText={props.setComment}
              placeholderTextColor="#fff"
            ></TextInput>
            <TouchableOpacity activeOpacity={0.7} onPress={props.ajoutcomment}>
              <FontAwesome name="send" size={25} color="#ec6e5b" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: "rgba(77, 77, 77, 0.5)",
    marginTop: 10,
    padding: 10,
    flexDirection: "column",
  },
  eventInfos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  appointmentInfos: {
    marginLeft: 10,
    flex: 1,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 5,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  commentText: {
    fontSize: 10,
    color: "white",
  },
  inputcommentcontaire: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inputcomment: {
    width: "75%",
    backgroundColor: "#333",
    color: "white",
    padding: 10,
    borderRadius: 8,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#555",
  },
  titlefilm: {
    color: "#FFFFFF",
  },
  filminfoContainer: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  imageFilm: {
    height: 100,
    width: 350,
    borderRadius: 10,
    marginBottom: 15,
  },
  titleFilm: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    alignSelf: "center",
  },
});
