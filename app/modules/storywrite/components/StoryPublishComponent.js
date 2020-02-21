import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import baseURL from "../../../config/network";
import { Button, VectorIcon } from "../../common";
import ImagePicker from "react-native-image-picker";

export default class StoryPublishComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      imageUrl: "",
      category: new Map(),
      imageLoading: false
    };
  }

  _onPressItem = item => {
    this.setState(state => {
      const category = state.category;
      if (category.get(item._id) == true) {
        category.delete(item._id);
      } else if ([...category.keys()].length >= 3) {
        alert("You can choose 3 category.");
      } else if (!category.get(item._id)) {
        category.set(item._id, true);
      }

      return { category };
    });
  };

  _renderItem = ({ item, index }) => {
    return (
      <Button
        name={item.name}
        onPress={() => this._onPressItem(item)}
        styles={[
          $$.categoryItem,
          {
            backgroundColor: this.state.category.get(item._id)
              ? GlobalStyles.COLOR_PRIMARY_DARK
              : GlobalStyles.COLOR_PRIMARY_LIGHT
          }
        ]}
      />
    );
  };

  _keyExtractor = (item, index) => index.toString();

  _uploadImage = () => {
    ImagePicker.showImagePicker(async response => {
      await this.setState({ imageLoading: true });

      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };
        let image = await this.props.uploadImage(response);
        this.setState({
          imageUrl: image.imageUrl
        });
      }

      await this.setState({ imageLoading: false });
    });
  };

  render() {
    return (
      <View style={$$.container}>
        <ScrollView>
          <View style={$$.coverImageContainer}>
            <TouchableOpacity
              style={[$$.coverImage]}
              onPress={() => this._uploadImage()}
            >
              {this.state.imageLoading ? (
                <ActivityIndicator
                  size="large"
                  color={GlobalStyles.COLOR_PRIMARY_MAIN}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {this.state.imageUrl !== "" ? (
                    <Image
                      resizeMode="cover"
                      style={$$.img}
                      source={{
                        uri: baseURL + "/uploads/images/" + this.state.imageUrl
                      }}
                    />
                  ) : (
                    <VectorIcon
                      name="camera-alt"
                      iconType="MaterialIcons"
                      color={GlobalStyles.COLOR_PRIMARY_MAIN}
                      size={28}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={$$.sectionInputContainer}>
            <TextInput
              value={this.state.title}
              placeholder="Write story title ..."
              onChangeText={title => this.setState({ title })}
            />
          </View>
          <View style={$$.contentInputContainer}>
            <View style={$$.categoryTitleContainer}>
              <Text
                style={[Font("normal", "normal", "large"), $$.categoryTitle]}
              >
                Select category
              </Text>
            </View>
            {this.props.data.loading == false ? (
              <FlatList
                contentContainerStyle={$$.categoryContainer}
                data={this.props.data.categories}
                renderItem={this._renderItem}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
              />
            ) : null}
          </View>
        </ScrollView>
        <View style={$$.bottomButton}>
          <Button
            name="Publish"
            styles={$$.publishButton}
            color={GlobalStyles.COLOR_PRIMARY_MAIN}
            onPress={() => this.props.onPublish(this.state)}
          />
          <Button
            name="Draft"
            styles={$$.publishButton}
            color={GlobalStyles.COLOR_PRIMARY_MAIN}
            onPress={() => this.props.onSaveDraft(this.state)}
          />
        </View>
      </View>
    );
  }
}

const $$ = {
  categoryTitle: {
    color: GlobalStyles.COLOR_PRIMARY_DARK
  },
  categoryTitleContainer: {
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    padding: GlobalStyles.PADDING,
    borderBottomColor: GlobalStyles.COLOR_BORDER,
    borderBottomWidth: 1
  },
  categoryItem: {
    margin: GlobalStyles.PADDING * 0.25,
    borderRadius: 40,
    minWidth: 100,
    padding: GlobalStyles.PADDING * 0.5,
    elevation: 2
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: GlobalStyles.PADDING * 0.5
  },
  coverImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: GlobalStyles.COLOR_LIGHTEST,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHT
  },
  coverImageContainer: {
    alignItems: "center",
    backgroundColor: GlobalStyles.COLOR_LIGHT,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER,
    padding: GlobalStyles.PADDING * 0.5,
    marginBottom: 2
  },
  contentInputContainer: {
    backgroundColor: GlobalStyles.COLOR_LIGHT,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER,
    marginBottom: 2
  },
  sectionInputContainer: {
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER,
    padding: GlobalStyles.PADDING * 0.5,
    marginBottom: 2
  },
  publishButton: {
    elevation: 1,
    borderRadius: 30,
    marginHorizontal: GlobalStyles.PADDING * 0.25
  },
  bottomButton: {
    flexDirection: "row",
    padding: GlobalStyles.PADDING * 0.25,
    minHeight: 50,
    marginTop: 2
  }
};
