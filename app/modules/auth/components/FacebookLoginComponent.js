import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import { Button } from "../../common";

export default class LibraryInfoComponent extends Component {
  render() {
    return (
      <View style={$$.rootContainer}>
        <View style={$$.imgContainer}>
          <Image
            resizeMood="contain"
            source={require("../../../../public/images/logo.png")}
            style={{
              width: 160,
              height: 160,
              marginBottom: GlobalStyles.PADDING
            }}
          />

          <Text
            style={[
              Font("normal", "bold", "larger"),
              {
                color: GlobalStyles.COLOR_PRIMARY_DARK
              }
            ]}
          >
            Welcome to Golpogatha
          </Text>

          <Text
            style={[
              Font("normal", "bold", "small"),
              {
                color: GlobalStyles.COLOR_SECONDARY_DARK
              }
            ]}
          >
            বিশ্বের দরবারে ছড়িয়ে দিন আপনার গল্প
          </Text>
        </View>
        <View style={$$.container}>
          <Button
            onPress={() => this.props.facebookLogin()}
            name="Login with Facebook"
            styles={$$.topButton}
            isBusy={this.props.isBusy}
            disabled={this.props.isBusy}
          />
        </View>
      </View>
    );
  }
}

const $$ = {
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHT,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: GlobalStyles.PADDING * 3,
    justifyContent: "space-between"
  },
  imgContainer: {
    alignItems: "center",
    marginVertical: GlobalStyles.PADDING * 2
  },
  topButton: {
    width: GlobalStyles.DEVICE_WIDTH / 3 - GlobalStyles.PADDING,
    height: 50,
    padding: GlobalStyles.PADDING * 0.5,
    borderRadius: 25
  }
};
