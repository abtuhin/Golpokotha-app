import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import { OptionMenu, IconSquareBtn, Button, VectorIcon } from "../../common";
import baseURL from "../../../config/network";

const MENU_ITEMS = [
  { name: "Share", onPress: () => alert("Share") },
  { name: "Download", onPress: () => alert("Download") },
  { name: "Add to library", onPress: () => alert("add library") }
];

export default class SearchedStoriesComponent extends Component {
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={$$.itemContainer}
        onPress={() => {
          this.props.navigation.navigate("storyDetail", {
            _id: item._id,
            title: item.title
          });
        }}
      >
        <Image
          resizeMode="cover"
          style={$$.listImg}
          source={{ uri: baseURL + "/uploads/images/" + item.imageUrl }}
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
            <Text
              style={[
                Font("normal", "normal", "small"),
                { color: GlobalStyles.COLOR_PRIMARY_MAIN }
              ]}
            >
              {item.author.name}
            </Text>
          </View>
          <View style={$$.iconOptions}>
            <OptionMenu items={MENU_ITEMS} />
            <IconSquareBtn
              name={"file-download"}
              iconType="MaterialIcons"
              onPress={() => {
                alert("download me");
              }}
            />
          </View>
          <View style={$$.contentFooter}>
            <View style={$$.iconInfo}>
              <Text style={[Font("normal", "normal", "smaller"), $$.iconText]}>
                {item.views}
              </Text>
              <VectorIcon
                name="remove-red-eye"
                iconType="MaterialIcons"
                color={GlobalStyles.COLOR_DARKER}
                size={14}
              />
            </View>
            <View style={$$.iconInfo}>
              <Text style={[Font("normal", "normal", "smaller"), $$.iconText]}>
                3.9
              </Text>
              <VectorIcon
                name="star"
                iconType="MaterialIcons"
                color={GlobalStyles.COLOR_DARKER}
                size={14}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  _renderFooter = () => {
    if (this.props.loading == false) {
      return null;
    }
    return (
      <View
        style={{
          paddingVertical: GlobalStyles.PADDING
        }}
      >
        <ActivityIndicator
          size="small"
          color={GlobalStyles.COLOR_PRIMARY_LIGHT}
        />
      </View>
    );
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.data == nextProps.data) {
      return false;
    }
    return true;
  }

  render() {
    console.log(
      "===============rendering component baal================",
      this.props.data
    );
    return (
      <View style={$$.rootContainer}>
        <View style={$$.container}>
          <FlatList
            data={this.props.data.stories.items}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReached={this.props.onLoadMore}
            onEndReachedThreshold={0.2}
            refreshing={this.props.refreshing}
            ListFooterComponent={this._renderFooter}
            removeClippedSubviews={true}
          />
        </View>
      </View>
    );
  }
}

const $$ = {
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHT
  },
  topButton: {
    maxWidth: GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING,
    borderRadius: GlobalStyles.DEVICE_WIDTH / 4,
    padding: GlobalStyles.PADDING * 0.5
  },
  topButtonContainer: {
    flexDirection: "row",
    padding: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.COLOR_BORDER,
    justifyContent: "space-between"
  },
  moreButton: {
    maxWidth: GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING,
    borderRadius: (GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING) / 2,
    marginBottom: GlobalStyles.PADDING
  },
  iconOptions: {
    flexDirection: "column",
    justifyContent: "space-between",
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
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: GlobalStyles.PADDING * 0.5,
    paddingLeft: GlobalStyles.PADDING * 0.5,
    paddingRight: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_LIGHT
  },
  itemContainer: {
    flex: 1,
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
    elevation: 2,
    overflow: "hidden"
  },
  listImg: {
    width: 80,
    height: 110
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10
  }
};
