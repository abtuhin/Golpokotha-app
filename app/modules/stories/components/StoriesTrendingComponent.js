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
import baseURL from "../../../config/network";
import { OptionMenu, IconSquareBtn, Button, VectorIcon } from "../../common";

const MENU_ITEMS = [
  { name: "Share", onPress: () => alert("Share") },
  { name: "Download", onPress: () => alert("Download") },
  { name: "Add to library", onPress: () => alert("add library") }
];

export default class StoriesTrendingComponent extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("storyDetail", {
            _id: item._id,
            title: item.title
          })
        }
        style={[
          $$.itemContainer,
          {
            marginLeft: GlobalStyles.PADDING * 0.5,
            marginRight: 2
            // 2(
            //   this.props.data.stories.items &&
            //     this.props.data.stories.items.length > 1 &&
            //     this.props.data.stories.items.length - 1
            // ) === index
            //   ? GlobalStyles.PADDING * 0.5
            //   : 0
          }
        ]}
      >
        <Image
          resizeMode="stretch"
          style={$$.gridImg}
          source={{ uri: baseURL + "/uploads/images/" + item.imageUrl }}
        />
        <View style={$$.middle}>
          <View style={{ flex: 1 }}>
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
          <OptionMenu items={MENU_ITEMS} />
        </View>
        <View style={[$$.contentFooter]}>
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
          <IconSquareBtn
            name={"file-download"}
            iconType="MaterialIcons"
            onPress={() => {
              alert("download me");
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  _renderListByCategory = () => {
    // if (this.props.data.loading == false) {
    return (
      <ScrollView>
        {this.props.data.categories.map((category, index) => {
          return category.stories.items.length ? (
            <View
              key={index}
              style={{ marginBottom: GlobalStyles.PADDING * 0.5 }}
            >
              <TouchableOpacity
                style={$$.headerContainer}
                onPress={() => {
                  this.props.navigation.navigate("storyListByCategory", {
                    _id: category._id,
                    name: category.name
                  });
                }}
              >
                <Text style={[Font("normal", "bold", "medium"), $$.iconText]}>
                  {category.name}
                </Text>
                <VectorIcon
                  name="arrow-forward"
                  iconType="MaterialIcons"
                  color={GlobalStyles.COLOR_PRIMARY_DARK}
                  size={20}
                />
              </TouchableOpacity>

              <FlatList
                contentContainerStyle={{
                  marginTop: GlobalStyles.PADDING * 0.5,
                  paddingRight: GlobalStyles.PADDING * 0.5
                }}
                extraData={category.stories.items}
                data={category.stories.items}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                horizontal={true}
              />
            </View>
          ) : null;
        })}
      </ScrollView>
    );
    // } else {
    //   return (

    //   );
    // }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: GlobalStyles.COLOR_LIGHT,
          justifyContent: "center"
        }}
      >
        {this._renderListByCategory()}
      </View>
    );
  }
}

const $$ = {
  headerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: GlobalStyles.PADDING,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    elevation: 1,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER
  },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    padding: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },
  iconText: {
    color: GlobalStyles.COLOR_PRIMARY_DARK,
    marginRight: GlobalStyles.PADDING * 0.5
  },
  iconInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: GlobalStyles.PADDING * 2
  },
  contentFooter: {
    flexDirection: "row",
    padding: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },

  container: {
    // paddingTop: GlobalStyles.PADDING * 0.5,
    backgroundColor: GlobalStyles.COLOR_LIGHT,
    flex: 1
  },
  itemContainer: {
    marginBottom: GlobalStyles.PADDING * 0.5,
    borderRadius: 10,
    borderColor: GlobalStyles.COLOR_BORDER,
    borderWidth: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    overflow: "hidden",
    flex: 1
  },
  gridImg: {
    width: GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING,
    height: 150
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10
  }
};
