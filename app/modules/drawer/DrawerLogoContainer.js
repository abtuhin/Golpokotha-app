import React from "react";
import {
  Text,
  View,
  Image as NativeImage,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import GlobalStyles, { Font } from "../../config/styles";
import { DefaultImage } from "../common";

export default class DrawerLogoContainer extends React.Component {
  render() {
    return (
      <View style={styles.header} accessibilityLabel={"avator1"}>
        {/* <TouchableOpacity style={styles.avatar} onPress={() => {}}> */}
        {/* {this.props.userProfile ? (
							<View style={styles.avatarContainer}>
								{Platform.OS === "ios" ? (
									<Image style={styles.avatar} source={{ uri: this.props.userProfile.ProfileImage }} />
								) : (
									<NativeImage style={styles.avatar} source={{ uri: this.props.userProfile.ProfileImage }} />
								)}
							</View>
						) : (
							<DefaultImage fullName={"Obaidul"} />
						)} */}
        <NativeImage
          source={require("../../../public/images/logo.png")}
          style={{ width: 132, height: 132 }}
        />
        <Text
          style={[
            Font("normal", "bold", "normal"),
            {
              color: GlobalStyles.COLOR_LIGHTEST,
              marginTop: GlobalStyles.PADDING
            }
          ]}
        >
          Obaidul Islam Khan Sazid
        </Text>
        {/* </TouchableOpacity> */}
        {/* <View style={styles.avatarDetailsContainer}>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Obaidul Islam Khan Sazid</Text>
						</View>
						<TouchableOpacity accessibilityLabel={"avator2"} style={styles.settingsIconContainer} onPress={() => {}}>
							<CustomeImage type="SETTINGS_ALTERNATE" styles={{ height: 20, width: 20 }} />
						</TouchableOpacity>
					</View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: GlobalStyles.DEVICE_HEIGHT * 0.35,
    backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
    paddingVertical: GlobalStyles.PADDING
  },
  titleContainer: { marginTop: GlobalStyles.PADDING * 0.5 },
  title: {
    color: GlobalStyles.COLOR_LIGHTEST
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25
  },

  iconContainer: {
    marginRight: GlobalStyles.PADDING,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -5
  },

  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden"
  },
  settingsIconContainer: {
    position: "absolute",
    right: 0,
    padding: GlobalStyles.PADDING * 0.5,
    paddingBottom: -2
  },
  avatarDetailsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    // borderWidth: 1,
    // borderColor: "white",
    width: GlobalStyles.DEVICE_WIDTH * 0.75 - GlobalStyles.PADDING * 2
  }
});
