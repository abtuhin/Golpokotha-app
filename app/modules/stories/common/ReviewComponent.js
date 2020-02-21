import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput
} from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import { Button, VectorIcon } from "../../common";
import moment from "moment";

export class ReviewComponent extends Component {
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
      rating: 0,
      text: ""
    };
  }

  _renderStar = (index, item) => {
    if (index < item.rating) {
      return (
        <VectorIcon
          name="star"
          iconType="MaterialIcons"
          color={GlobalStyles.COLOR_SECONDARY_MAIN}
          size={14}
        />
      );
    } else {
      return (
        <VectorIcon
          name="star-border"
          iconType="MaterialIcons"
          color={GlobalStyles.COLOR_SECONDARY_MAIN}
          size={14}
        />
      );
    }
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={$$.reviewContainer}>
        <Image
          source={{ uri: item.user.profileImage }}
          style={$$.reviewAvatar}
        />
        <View style={$$.content}>
          <Text
            style={[
              Font("normal", "bold", "normal"),
              { color: GlobalStyles.COLOR_PRIMARY_DARK }
            ]}
          >
            {item.user.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: GlobalStyles.PADDING * 0.5
            }}
          >
            {["", "", "", "", ""].map((_, i) => (
              <View key={i}>{this._renderStar(i, item)}</View>
            ))}
          </View>
          <Text
            style={[
              Font("normal", "normal", "small"),
              {
                color: GlobalStyles.COLOR_COLOR_DARK,
                flex: 1,
                flexWrap: "wrap"
              }
            ]}
          >
            {item.comment}
          </Text>
        </View>
      </View>
    );
  };

  _keyExtractor = (item, index) => index.toString();

  _renderHeader = () => {
    if (this.props.reviews.length) {
      return (
        <View style={$$.itemHeader}>
          <Text
            style={[
              Font("normal", "normal", "large"),
              {
                color: GlobalStyles.COLOR_PRIMARY_DARK
              }
            ]}
          >
            Reviews & Rating
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={$$.container}>
        <FlatList
          data={this.props.reviews}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          author
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    );
  }
}

const $$ = {
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST
  },
  reviewContainer: {
    flex: 1,
    flexDirection: "row",
    padding: GlobalStyles.PADDING * 0.5,
    borderBottomColor: GlobalStyles.COLOR_BORDER,
    borderBottomWidth: 1,
    alignItems: "center"
  },
  reviewAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  content: {
    flex: 1,
    marginLeft: GlobalStyles.PADDING,
    marginRight: GlobalStyles.PADDING
  },
  itemHeader: {
    paddingVertical: GlobalStyles.PADDING * 0.5,
    paddingHorizontal: GlobalStyles.PADDING,
    backgroundColor: GlobalStyles.COLOR_LIGHTER,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER,
    elevation: 1
  }
};
