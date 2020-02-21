import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import CustomImage from "../../../config/images";
import GlobalStyles, { Font } from "../../../config/styles";
import { Button, VectorIcon, IconSquareBtn } from "../../common";

export class DetailHeaderComponent extends Component {
  render() {
    const {
      title,
      category,
      imageUrl,
      author,
      categories,
      onPressRead = () => {},
      addToLibrary = () => {}
    } = this.props;

    return (
      <View style={$$.header}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: imageUrl }}
              resizeMode="cover"
              style={$$.bookImage}
            />
          </View>

          <View style={{ flex: 1, marginLeft: GlobalStyles.PADDING * 0.5 }}>
            <Text
              style={[
                Font("normal", "bold", "large"),
                { color: GlobalStyles.COLOR_PRIMARY_DARK }
              ]}
            >
              {title}
            </Text>
            <Text
              style={[
                Font("normal", "normal", "normal"),
                {
                  color: GlobalStyles.COLOR_DARK
                }
              ]}
            >
              {author}
            </Text>
            <Text
              style={[
                Font("normal", "normal", "normal"),
                {
                  color: GlobalStyles.COLOR_DARK
                }
              ]}
            >
              Publised on{" "}
              <Text
                style={[
                  Font("normal", "bold", "normal"),
                  {
                    color: GlobalStyles.COLOR_DARKER
                  }
                ]}
              >
                27 Feb, 2018
              </Text>
            </Text>
            <Text
              style={[
                Font("normal", "bold", "small"),
                {
                  color: GlobalStyles.COLOR_PRIMARY_MAIN
                }
              ]}
            >
              {categories.map(item => item.name + ", ")}
            </Text>
            <View style={$$.contentFooter}>
              <View style={$$.iconInfo}>
                <Text
                  style={[Font("normal", "normal", "smaller"), $$.iconText]}
                >
                  5K
                </Text>
                <VectorIcon
                  name="remove-red-eye"
                  iconType="MaterialIcons"
                  color={GlobalStyles.COLOR_DARKER}
                  size={14}
                />
              </View>
              <View style={$$.iconInfo}>
                <Text
                  style={[Font("normal", "normal", "smaller"), $$.iconText]}
                >
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

            <View style={$$.contentFooter}>
              <Button
                onPress={onPressRead}
                name="Read"
                styles={$$.detailButton}
              />

              <Button
                onPress={addToLibrary}
                name="Library"
                styles={$$.detailButton}
                icon={{ name: "plus", type: "FontAwesome" }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const $$ = {
  detailButton: {
    maxWidth: GlobalStyles.DEVICE_WIDTH / 2 - GlobalStyles.PADDING,
    borderRadius: GlobalStyles.DEVICE_WIDTH / 4,
    padding: GlobalStyles.PADDING * 0.5,
    marginRight: GlobalStyles.PADDING * 0.5
  },
  header: {
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    paddingHorizontal: GlobalStyles.PADDING * 0.5,
    paddingTop: GlobalStyles.PADDING * 0.5,
    paddingBottom: GlobalStyles.PADDING * 0.5,
    marginBottom: GlobalStyles.PADDING
  },
  iconText: {
    color: GlobalStyles.COLOR_DARK,
    marginRight: GlobalStyles.PADDING * 0.5
  },
  iconInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: GlobalStyles.PADDING
  },
  contentFooter: {
    marginTop: GlobalStyles.PADDING * 0.5,
    flexDirection: "row"
  },
  bookImage: {
    height: 150,
    width: 120,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: GlobalStyles.COLOR_LIGHTEST
    // elevation: 2
  }
};
