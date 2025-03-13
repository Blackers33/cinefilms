import {
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Avatar from "../common/Avatar";


export default function Comment(props) {


  return (
    <View style={styles.commentContainer}>
      <View style={styles.userInfos}>
        <Avatar uri={props.avatar}></Avatar>
        <Text style={styles.usernametext}>{props.username}</Text>
      </View>
      <View style={styles.contenucomment}>
      <Text key={props.index} style={styles.commentText}>
          {props.content}
        </Text>
        <Text style={styles.commentDate}>{props.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 5,
    backgroundColor: 'rgba(77, 77, 77, 0.2)',
    opacity: 1,
    marginTop: 5,
    //backgroundColor: "#444",
    borderRadius: 5,
  },
  userInfos: {
    flexDirection: 'row',
    justifyContent: 'start',
    padding: 0,
    margin: 0,
  },
  contenucomment: { 
    marginLeft: 35
  },
  commentText:{
    color: "white",
    fontSize: 15,
    color: 'white',
  },
  commentDate: {
    fontSize: 12,
    color : 'white',
    fontWeight: 200,
  },
  usernametext:{
    fontWeight: 500,
    alignSelf:"center",
    fontSize: 14,
    color: 'rgb(201, 65, 6)',
    marginTop: 2,
    marginLeft: 5,
  },
});