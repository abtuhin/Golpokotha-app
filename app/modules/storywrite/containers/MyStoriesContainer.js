import React, { Component } from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import StoryDraftComponent from "../components/StoryDraftComponent";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon, FloatingButton } from "../../common";
import { graphql, compose } from "react-apollo";
import { syncStorageDraft } from "../actions";

class MyStoriesContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Draft Stories",
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
    this.state = {
      drafts: []
    };
  }

  componentDidMount = async () => {
    let drafts = await AsyncStorage.getItem("stories");
    await this.setState({ drafts: [...JSON.parse(drafts)] });
  };

  _syncStorageDraft = data => {
    this.props.syncStorageDraft(data);
    this.props.navigation.navigate("storyDrawer", { draft: true });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.drafts.length ? (
          <View style={{ flex: 1, zIndex: 10, position: "relative" }}>
            <StoryDraftComponent
              drafts={this.state.drafts}
              syncStorageDraft={this._syncStorageDraft}
            />
          </View>
        ) : (
          <View />
        )}
        <FloatingButton
          onPress={() => {
            this.props.navigation.navigate("storyDrawer");
          }}
        />
      </View>
    );
  }
}

// const mapStateToProps = store => {
// 	return {
// 		articles: store.articles.articles
// 	};
// };
//
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      syncStorageDraft
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(MyStoriesContainer);
