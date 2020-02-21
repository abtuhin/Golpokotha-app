import React, { Component } from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { getCategories, uploadImage, publishStory } from "../actions";
import { graphql, compose } from "react-apollo";
import { getStories } from "../../stories/actions";
import StoryPublishComponent from "../components/StoryPublishComponent";
import { store } from "../../../store";

class StoryPublishContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Publish your story",
      headerStyle: { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN },
      headerTitleStyle: [
        Font("normal", "bold", "medium"),
        { color: GlobalStyles.COLOR_LIGHTEST, position: "absolute" }
      ],
      headerLeft: (
        <NavigationBarIcon type="BACK" onPress={() => navigation.pop()} />
      ),
      headerRight: null
    };
  };

  /* END HEADER CONFIG */

  constructor(props) {
    super(props);
    this.state = {};
  }

  _onPublish = async data => {
    try {
      let categories = [...data.category.keys()];

      let reqBody = [];
      this.props.sections.map(item => {
        reqBody.push(
          ...[
            { text: item.section, style: "header" },
            { text: item.content, style: "content" }
          ]
        );
      });

      let response = await this.props.publishStory({
        variables: {
          title: data.title,
          pdf: JSON.stringify(reqBody),
          imageUrl: data.imageUrl,
          category: categories
        },
        refetchQueries: [{ query: getStories }]
      });

      await store.dispatch({ type: "RESET_STORY" });
      this.props.navigation.navigate("home");
    } catch (e) {
      alert("Something went wrong");
    }
  };

  _onSaveDraft = async data => {
    try {
      let categories = [...data.category.keys()];

      let draft = {};
      draft["title"] = data.title;
      draft["categories"] = categories;
      draft["sections"] = [...this.props.sections];

      let drafts = await AsyncStorage.getItem("stories");
      if (drafts && JSON.parse(drafts).length) {
        let lists = JSON.stringify([
          ...JSON.parse(drafts),
          JSON.stringify(draft)
        ]);
        await AsyncStorage.setItem("stories", lists);
      } else {
        await AsyncStorage.setItem(
          "stories",
          JSON.stringify([JSON.stringify(draft)])
        );
      }
      await store.dispatch({ type: "RESET_STORY" });
      this.props.navigation.navigate("home");
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    }
  };

  render() {
    return (
      <StoryPublishComponent
        data={this.props.getCategories}
        onPublish={this._onPublish}
        onSaveDraft={this._onSaveDraft}
        uploadImage={this.props.uploadImage}
      />
    );
  }
}

const mapStateToProps = store => {
  return {
    currentItem: store.storyWrite.currentItem,
    sections: store.storyWrite.sections
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadImage
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    graphql(getCategories, { name: "getCategories" }),
    graphql(publishStory, { name: "publishStory" })
  )(StoryPublishContainer)
);
