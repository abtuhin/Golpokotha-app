import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import GlobalStyles, { Font } from "../../config/styles";
import { NavigationActions } from "react-navigation";
import DrawerLogoContainer from "./DrawerLogoContainer";
import { VectorIcon } from "../common";
import Image from "../../config/images";

class SideMenu extends Component {
  // navigateToScreen = route => () => {
  // 	const navigateAction = NavigationActions.navigate({
  // 		routeName: route
  // 	});
  // 	this.props.navigation.dispatch(navigateAction);
  // };

  _onCurrentScreen = (name, screenName) => {
    // console.warn(screenName, type);
    // alert(currentDrawerTab);
    if (
      (screenName === "home" && name === "Home") ||
      (screenName === "library" && name === "Library") ||
      (screenName === "writeStory" && name === "Write Story") ||
      (screenName === "update" && name === "Update")
    )
      return true;
    return false;
  };

  _renderItem = ({ name, icon, screenName, onPress, index }) => {
    // console.warn(name);
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.item,
          {
            backgroundColor: this._onCurrentScreen(name, screenName)
              ? GlobalStyles.COLOR_PRIMARY_MAIN
              : GlobalStyles.COLOR_LIGHTEST
          }
        ]}
        onPress={() => {
          onPress();
        }}
        disabled={this._onCurrentScreen(name, screenName) ? true : false}
      >
        <View style={styles.iconContainer}>
          <VectorIcon
            name={icon.name}
            iconType={icon.type}
            color={
              this._onCurrentScreen(name, screenName)
                ? "#fff"
                : GlobalStyles.COLOR_PRIMARY_DARK
            }
            size={20}
          />
        </View>
        <Text
          style={[
            styles.itemTitle,
            Font("normal", "normal", "large"),
            {
              color: this._onCurrentScreen(name, screenName)
                ? GlobalStyles.COLOR_LIGHTEST
                : GlobalStyles.COLOR_DARKEST
            }
          ]}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props,
      screens = navigation.state.routes[0].routes,
      screenName = screens[screens.length - 1].routeName;

    return (
      <View style={styles.container}>
        <DrawerLogoContainer />

        <View style={styles.itemContainer}>
          {[
            {
              name: "Home",
              icon: {
                name: "home",
                type: "MaterialIcons"
              },
              onPress: () => {
                this.props.navigation.navigate("home");
              }
            },
            {
              name: "Library",
              icon: {
                name: "library-books",
                type: "MaterialIcons"
              },
              onPress: () => {
                this.props.navigation.navigate("library");
              }
            },
            {
              name: "Write Story",
              icon: {
                name: "note",
                type: "SimpleLineIcons"
              },
              onPress: () => {
                this.props.navigation.navigate("writeStory");
              }
            },
            {
              name: "Update",
              icon: {
                name: "notifications",
                type: "MaterialIcons"
              },
              onPress: () => {
                this.props.navigation.navigate("update");
              }
            },
            {
              name: "Logout",
              icon: {
                name: "exit-to-app",
                type: "MaterialIcons"
              },
              onPress: () => {
                // this.props.navigation.navigate("logout");
              }
            }
          ].map((item, index) =>
            this._renderItem({ ...item, screenName, index })
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: GlobalStyles.DEVICE_HEIGHT * 0.25,
    padding: GlobalStyles.PADDING
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  titleContainer: { marginTop: GlobalStyles.PADDING * 0.5 },
  title: {
    color: GlobalStyles.COLOR_LIGHTEST,
    backgroundColor: "transparent"
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  itemContainer: {
    paddingTop: GlobalStyles.PADDING,
    paddingBottom: GlobalStyles.PADDING
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: GlobalStyles.PADDING,
    paddingVertical: GlobalStyles.PADDING * 0.25
  },
  iconContainer: {
    marginRight: GlobalStyles.PADDING,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -5
  },
  icon: {
    height: 30,
    width: 30
  },
  itemTitle: { flex: 1 },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden"
  },
  settingsIconContainer: {
    position: "absolute",
    right: 0,
    // borderWidth: 1,
    padding: GlobalStyles.PADDING * 0.5,
    paddingBottom: -2
  },
  avatarDetailsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    // borderWidth: 1,
    // borderColor: "white",
    width: GlobalStyles.DEVICE_WIDTH * 0.75 - GlobalStyles.PADDING * 2
  },
  itemContainer: {
    paddingTop: GlobalStyles.PADDING,
    paddingBottom: GlobalStyles.PADDING
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: GlobalStyles.PADDING,
    paddingVertical: GlobalStyles.PADDING * 0.25
  },
  iconContainer: {
    marginRight: GlobalStyles.PADDING,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -5
  },
  icon: {
    height: 30,
    width: 30
  }
});

export default SideMenu;
