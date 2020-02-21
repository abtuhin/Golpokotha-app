import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import baseURL from "../../../config/network";
import { VectorIcon, Button } from "../../common";
import { DetailHeaderComponent, ReviewComponent } from "../common";

export default class StoryDetailComponent extends Component {
  static defaultProps = {
    ratingLabel: {
      0: "Hated it",
      1: "Disliked it",
      2: "It's OK",
      3: "Liked it",
      4: "Loved it"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      rating: 0,
      alreadySubmitted: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.story !== nextProps.data.story) {
      let userReview = nextProps.data.story.reviews.find(
        item => item.user.userId === nextProps.data.story.user.userId
      );
      if (userReview) {
        this.setState({ alreadySubmitted: true });
      }
    }
  }

  _renderStar = index => {
    if (index < this.state.rating) {
      return (
        <VectorIcon
          name="star"
          iconType="MaterialIcons"
          color={GlobalStyles.COLOR_SECONDARY_MAIN}
          size={25}
        />
      );
    } else {
      return (
        <VectorIcon
          name="star-border"
          iconType="MaterialIcons"
          color={GlobalStyles.COLOR_SECONDARY_MAIN}
          size={25}
        />
      );
    }
  };

  _renderStarAlreadyRated = index => {
    let userReview = this.props.data.story.reviews.find(
      item => item.user.userId === this.props.data.story.user.userId
    );

    if (index < userReview.rating) {
      return (
        <VectorIcon
          name="star"
          iconType="MaterialIcons"
          color={GlobalStyles.COLOR_SECONDARY_MAIN}
          size={25}
        />
      );
    } else {
      return (
        <VectorIcon
          name="star-border"
          iconType="MaterialIcons"
          color={GlobalStyles.COLOR_SECONDARY_MAIN}
          size={25}
        />
      );
    }
  };

  render() {
    return (
      <View style={$$.container}>
        {this.props.data.story && (
          <ScrollView>
            <DetailHeaderComponent
              onPressRead={() =>
                this.props.navigation.navigate("pdfReader", {
                  story: this.props.data.story
                })
              }
              addToLibrary={this.props.addToLibrary}
              categories={this.props.data.story.categories}
              title={this.props.data.story.title}
              author={this.props.data.story.author.name}
              imageUrl={
                this.props.data.story.imageUrl
                  ? baseURL +
                    "/uploads/images/" +
                    this.props.data.story.imageUrl
                  : ""
              }
            />

            <View style={$$.reviewPostContainer}>
              <View style={{ marginTop: -50 }}>
                <Image
                  source={{
                    uri:
                      "https://graph.facebook.com/" +
                      this.props.data.story.user.userId +
                      "/picture?type=normal"
                  }}
                  style={$$.roundedImage}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1
                }}
              >
                {this.props.data.story.reviews.find(
                  item => item.user.userId === this.props.data.story.user.userId
                ) ? (
                  <View style={{ flexDirection: "row" }}>
                    {["", "", "", "", ""].map((_, i) => (
                      <View key={i}>{this._renderStarAlreadyRated(i)}</View>
                    ))}
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    {["", "", "", "", ""].map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          this.setState({ rating: i + 1 });
                        }}
                      >
                        {this._renderStar(i)}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={[$$.reactText, Font("normal", "normal", "small")]}>
                  {this.props.ratingLabel[this.state.rating - 1]}
                </Text>
                {this.state.rating != 0 &&
                  this.state.alreadySubmitted == false && (
                    <TextInput
                      style={$$.reviewInput}
                      onChangeText={text => this.setState({ text })}
                      value={this.state.text}
                      placeholder={"Write a short review..."}
                      multiline={true}
                      numberOfLines={4}
                    />
                  )}

                {this.state.rating != 0 &&
                  this.state.alreadySubmitted == false && (
                    <Button
                      name="Submit"
                      styles={$$.moreButton}
                      color={GlobalStyles.COLOR_SECONDARY_MAIN}
                      onPress={() => this.props.submitReview(this.state)}
                    />
                  )}
              </View>
            </View>

            <ReviewComponent reviews={this.props.data.story.reviews} />
          </ScrollView>
        )}
      </View>
    );
  }
}

const $$ = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },
  roundedImage: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: GlobalStyles.COLOR_LIGHTEST
  },
  moreButton: {
    width: 180,
    borderRadius: 90,
    marginTop: GlobalStyles.PADDING
  },
  pdf: {
    flex: 1,
    width: GlobalStyles.DEVICE_WIDTH,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    height: GlobalStyles.DEVICE_HEIGHT
  },
  reviewPostContainer: {
    flex: 1,
    padding: GlobalStyles.PADDING,
    borderTopColor: GlobalStyles.COLOR_BORDER,
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: GlobalStyles.PADDING * 3,
    marginBottom: GlobalStyles.PADDING
  },
  reactText: {
    color: GlobalStyles.COLOR_DARK,
    marginTop: GlobalStyles.PADDING * 0.5
  },
  reviewInput: {
    width: GlobalStyles.DEVICE_WIDTH - GlobalStyles.PADDING * 2.5,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    fontFamily: "nunito",
    fontSize: GlobalStyles.FONT_SIZE,
    paddingHorizontal: GlobalStyles.PADDING,
    height: GlobalStyles.PADDING * 2.5 + GlobalStyles.FONT_SIZE,
    color: GlobalStyles.COLOR_DARKER,
    flex: 1,
    // textAlign: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER
  }
});
