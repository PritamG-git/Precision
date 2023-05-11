import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import {
  GiftedChat,
  Bubble,
  Actions,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";
import { FONTS } from "../../theme/fonts";
import Icon from "react-native-vector-icons/Entypo";
import MatIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { BaseScreen } from "@/components/BaseScreen";
import { useSelector } from "react-redux";
import { getUser } from "@/selectors/UserSelectors";
import firestore from "@react-native-firebase/firestore";
import { UserController } from "@/controllers";
import { Loader } from "@/components/Loader";
import { Button } from "@/components";
import { Keyboard } from "react-native";
import { NormalAlert, OpenCamera, OpenGallery } from "@/utils/GlobalMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const Chat = (props) => {
  const user = useSelector(getUser);
  const myId = user?.userinfo?.id;
  const myPhoto = user?.profileinfo?.user_profiles?.profile_photo;
  const myEmail = user?.userinfo?.email;
  const myName = user?.userinfo?.user_profiles?.fullname;

  const [messages, setMessages] = useState([]);
  const [adminDetail, setAdminDetail] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [chatID, setChatID] = useState();
  const [image, setImage] = useState();

  const startChat = async () => {
    setLoadingUser(true);
    const ChId = firestore().collection("chatrooms").doc().id;
    setChatID(ChId);
    let param = {
      chat_id: ChId,
    };
    try {
      const res = await UserController.startChat(param);
      if (res.payload) {
        setAdminDetail({
          id: res.payload?.id,
          userProfile: res.payload?.user_profiles?.profile_photo,
          email: res.payload?.email,
        });
        await firestore().collection("chatrooms").doc(ChId).set({
          chatPartner: res.payload?.id,
          chatStatus: true,
          createdAt: moment().utc().toISOString(),
          recentMsgs: [],
          user: myId,
          userPhoto: myPhoto,
          chatPartnerPhoto: res.payload?.user_profiles?.profile_photo,
          isFile: false,
          userEmail: myEmail,
          chatPartnerEmail: res.payload?.email,
          userRole: 4,
          userName: myName,
          chatPartnerName: res.payload?.user_profiles?.fullname
        });
      }
      await AsyncStorage.setItem("ChatId", ChId);
    } catch (error) {
      alert(error.msg);
    } finally {
      setLoadingUser(false);
    }
  };

  /*  const endChat = async () => {
     let param = {
       chat_id: chatID,
     };
     try {
       const res = await UserController.endChat(param);
       await firestore()
         .collection("chatrooms")
         .doc(chatID).update({
           chatStatus: false,
         })
       showMessage({
         message: res.msg,
         type: "danger",
       });
       setAdminDetail(null)
       await AsyncStorage.removeItem('ChatId')
     } catch (error) {
       alert(error);
     }
   }; */

  const checkUser = async () => {
    setLoadingUser(true);
    let myAdmin = [];
    const querrySnapshot = firestore()
      .collection("chatrooms")
      .where("user", "==", myId)
      .where("chatStatus", "==", true)
      .orderBy("createdAt", "asc");
    await querrySnapshot.get().then((snapShot) => {
      myAdmin = snapShot.docs.map((snap) => {
        return {
          id: snap.data().chatPartner,
          userProfile: snap.data().chatPartnerPhoto,
          email: snap.data().chatPartnerEmail,
          docId: snap.id,
        };
      });
    });
    if (myAdmin.length) {
      setAdminDetail(myAdmin[0]);
      setChatID(myAdmin[0].docId);
    } else {
      await AsyncStorage.removeItem("ChatId");
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    const querySnap = firestore()
      .collection("chatrooms")
      .doc(chatID)
      .collection("messages")
      .orderBy("createdAt", "desc");

    const unSubscribe = querySnap.onSnapshot((snapShot) => {
      const allMessages = snapShot.docs.map((snap) => {
        return snap.data();
      });
      setMessages(allMessages);
    });

    return () => unSubscribe();
  }, [chatID]);

  useEffect(() => {
    checkUser();
  }, []);

  const camera = () => {
    OpenCamera().then((result) => {
      setImage(result.path);
    });
  };

  const gallery = () => {
    OpenGallery().then((result) => {
      setImage(result.path);
    });
  };

  const imagePress = () => {
    Keyboard.dismiss();
    NormalAlert({
      message: "Choose the way to upload image",
      yesText: "Gallery",
      cancelText: "Camera",
      singleButton: false,
    })
      .then((resp) => {
        gallery();
      })
      .catch(() => {
        camera();
      });
  };

  //****************** onsend function******************/
  const onSend = async (messagesArray) => {
    const msg = messagesArray[0];
    const myMsg = {
      ...msg,
      senderId: myId,
      receiverId: adminDetail.id,
      isFile: false,
      file_url: null,
      isRead: false
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messagesArray)
    );
    const lastMsg = await firestore().collection("chatrooms").doc(chatID).get()
    await firestore().collection("chatrooms").doc(chatID).update({
      recentMsgs: [...lastMsg.data().recentMsgs, { text: myMsg.text, time: moment().utc().toISOString() }]
    })
    await firestore()
      .collection("chatrooms")
      .doc(chatID)
      .collection("messages")
      .add({ ...myMsg, createdAt: moment().utc().toISOString() });
  };

  //********************************** Bubble render Function***************** */
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "#43686A",
            fontFamily: FONTS.PoppinsLight,
            fontSize: scale(12),
          },
          left: {
            color: "#FFFFFF",
            fontFamily: FONTS.PoppinsLight,
            fontSize: scale(12),
          },
        }}
        wrapperStyle={{
          right: {
            marginVertical: scale(3),
            backgroundColor: "#93AFB150",
            marginRight: scale(10),
          },

          left: {
            backgroundColor: "#43686A",
            marginVertical: scale(3),
            marginLeft: scale(10),
          },
        }}
      />
    );
  };

  //***********************Attaqchment image render Function *************/
  function renderActions(props) {
    return (
      <Actions
        {...props}
        options={{
          ["Document"]: (props) => {
            // console.log("document");
          },
          ["Send Image"]: imagePress,
          Cancel: (props) => {
            // console.log("Cancel");
          },
        }}
        icon={() => (
          <View style={{ borderRightWidth: scale(1), borderColor: "#93AFB1" }}>
            <Icon name={"attachment"} size={scale(20)} color={"#93AFB1"} />
          </View>
        )}
        onSend={(args) => console.log(args)}
      />
    );
  }

  function renderInputToolbar(props) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#F6FEFF",
          borderRadius: scale(30),
          marginHorizontal: scale(15),
          borderTopWidth: 0,
          paddingVertical: scale(5),
          marginBottom: Platform.OS == "ios" ? -15 : 0,
        }}
      />
    );
  }

  const renderSend = (sendProps) => {
    return (
      <Send
        {...sendProps}
        containerStyle={{
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/Home/send.png")}
          style={{
            width: scale(50),
            height: scale(50),
          }}
          resizeMode="contain"
        />
      </Send>
    );
  };

  /*  const renderBubble = (props) => {
     var sameUserInPrevMessage = false;
     if (
       props.previousMessage.user !== undefined &&
       props.previousMessage.user
     ) {
       props.previousMessage.user._id === props.previousMessage.user._id
         ? (sameUserInPrevMessage = true)
         : (sameUserInPrevMessage = false);
     }
 
     var messageBelongsToCurrentUser = "hel" == props.currentMessage.user._id;
     return (
       <View>
         {!sameUserInPrevMessage && (
           <View
             style={
               messageBelongsToCurrentUser
                 ? styles.messageTimeAndNameContainerRight
                 : styles.messageTimeAndNameContainerLeft
             }
           >
             <Bubble {...props} />
             <Text>{moment(props.currentMessage.createdAt).format("LT")}</Text>
             <Text>{props.currentMessage.user.name}</Text>
           </View>
         )}
       </View>
     );
   }; */

  return (
    <BaseScreen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: scale(15),
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={require("../../assets/Home/greenarrow.png")}
            style={{ tintColor: "#FFF", width: scale(24), height: scale(15) }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: scale(16),
            fontFamily: FONTS.PoppinsMedium,
          }}
        >
          Precision On Call
        </Text>
        <View />
        {/* <Image
          style={{ height: scale(30), width: scale(30) }}
          source={
            adminDetail?.userProfile ? { uri: adminDetail?.userProfile } : null
          }
          resizeMode="contain"
        /> */}
      </View>

      {loadingUser ? (
        <Loader />
      ) : adminDetail ? (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            flex: 9,
            borderTopLeftRadius: scale(40),
            borderTopRightRadius: scale(40),
            paddingBottom: Platform.OS == "android" ? scale(10) : 0,
          }}
        >
          <GiftedChat
            renderSend={renderSend}
            renderAvatar={null}
            placeholder={"Write..."}
            renderBubble={renderBubble}
            renderActions={renderActions}
            messages={messages}
            renderInputToolbar={renderInputToolbar}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: myId,
            }}
            messagesContainerStyle={{
              paddingBottom: Platform.OS == "ios" ? 0 : scale(10),
            }}
          />
          {/* <Button onPress={endChat} title="End Chat" textStyle={{ fontSize: scale(10) }} style={{ paddingVertical: verticalScale(8), width: '50%', marginTop: verticalScale(10) }} /> */}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: "#FFFFFF",
            flex: 9,
            borderTopLeftRadius: scale(40),
            borderTopRightRadius: scale(40),
            justifyContent: "center",
          }}
        >
          <Button
            onPress={startChat}
            title="Start Chat"
            textStyle={{ fontSize: scale(10) }}
            style={{ paddingVertical: verticalScale(8), width: "50%" }}
          />
        </View>
      )}
    </BaseScreen>
  );
};

export default Chat;
