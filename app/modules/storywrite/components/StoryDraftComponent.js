import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import { OptionMenu, IconSquareBtn, Button, VectorIcon } from "../../common";
import baseURL from "../../../config/network";

export default class StoryDraftComponent extends Component {
  _renderItem = data => {
    let item = JSON.parse(data);
    return (
      <TouchableOpacity
        style={$$.itemContainer}
        onPress={() => this.props.syncStorageDraft(item)}
      >
        <Image
          resizeMode="cover"
          style={$$.listImg}
          source={require("../../../../public/images/no_image.png")}
        />
        <View style={$$.content}>
          <View>
            <Text
              style={[
                Font("normal", "bold", "medium"),
                { color: GlobalStyles.COLOR_PRIMARY_DARK }
              ]}
            >
              {item.title}
            </Text>
          </View>
          <View style={$$.iconOptions}>
            <TouchableOpacity onPress={() => {}} style={$$.publishBtn}>
              <Text
                style={[
                  Font("normal", "bold", "smaller"),
                  {
                    color: GlobalStyles.COLOR_LIGHTEST,
                    marginRight: GlobalStyles.PADDING * 0.25
                  }
                ]}
              >
                Publish
              </Text>
              {/* <IconSquareBtn
                name={"file-download"}
                iconType="MaterialIcons"
                onPress={() => {
                  alert("download me");
                }}
              /> */}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={$$.container}>
        {this.props.drafts.map((item, key) => (
          <View style={{}} key={key}>
            {this._renderItem(item)}
          </View>
        ))}
        {/* <FlatList
          extraData={this.props}
          data={this.props.darfts}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={1200}
          removeClippedSubviews={true}
        /> */}
      </ScrollView>
    );
  }
}

const $$ = {
  container: {
    backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
    flex: 1,
    paddingTop: GlobalStyles.PADDING * 0.5,
    paddingLeft: GlobalStyles.PADDING * 0.5,
    paddingRight: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_LIGHT
  },
  topButton: {
    maxWidth: GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING,
    borderRadius: GlobalStyles.DEVICE_WIDTH / 4,
    padding: GlobalStyles.PADDING * 0.5
  },
  publishBtn: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: GlobalStyles.PADDING * 0.25,
    paddingHorizontal: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
    borderRadius: 50
  },
  moreButton: {
    maxWidth: GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING,
    borderRadius: (GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING) / 2,
    marginBottom: GlobalStyles.PADDING
  },
  iconOptions: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  iconText: {
    color: GlobalStyles.COLOR_DARK,
    marginRight: GlobalStyles.PADDING * 0.5
  },
  iconInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: GlobalStyles.PADDING * 2
  },
  contentFooter: {
    position: "absolute",
    bottom: 10,
    left: 5,
    flexDirection: "row"
  },
  content: {
    padding: GlobalStyles.PADDING * 0.5,
    position: "relative",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: GlobalStyles.PADDING * 0.5,
    borderRadius: 10,
    borderColor: GlobalStyles.COLOR_BORDER,
    borderWidth: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden"
  },
  listImg: {
    width: 80,
    height: 110
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10
  }
};
