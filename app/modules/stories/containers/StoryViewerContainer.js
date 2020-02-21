import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StoryViewerComponent from "../components/StoryViewerComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { graphql, compose } from "react-apollo";
import { getStory, submitReview } from "../actions";

class StoryViewerContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.story.title || "Story Viewer",
      headerStyle: { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN },
      headerTitleStyle: [
        Font("normal", "bold", "medium"),
        { color: GlobalStyles.COLOR_LIGHTEST }
      ],
      headerLeft: (
        <NavigationBarIcon type="BACK" onPress={() => navigation.goBack()} />
      ),
      headerRight: null
    };
  };

  /* END HEADER CONFIG */

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pdf } = this.props.navigation.state.params.story;
    return (
      <StoryViewerComponent navigation={this.props.navigation} pdf={pdf} />
    );
  }
}

// const mapStateToProps = store => {
// 	return {
// 		articles: store.articles.articles
// 	};
// };
//
// const mapDispatchToProps = dispatch => {
// 	return bindActionCreators(
// 		{
// 			fetchArticles
// 		},
// 		dispatch
// 	);
// };

export default connect(
  null,
  null
)(StoryViewerContainer);
