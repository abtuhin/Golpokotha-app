import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StoryDetailComponent from "../components/StoryDetailComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { graphql, Query, compose } from "react-apollo";
import { getStory, submitReview, addToLibrary } from "../actions";

class StoryDetailContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.title || "Story Detail",
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

  _submitReview = data => {
    let storyId = this.props.navigation.state.params._id;
    this.props.submitReview({
      variables: {
        rating: data.rating,
        comment: data.text,
        storyId: storyId
      },
      refetchQueries: [{ query: getStory, variables: { _id: storyId } }]
    });
  };

  _addToLibrary = async () => {
    let storyId = this.props.navigation.state.params._id;
    console.log("======storyId", storyId);
    let res = await this.props.addToLibrary({
      variables: {
        storyId: storyId
      }
      // refetchQueries: [{ query: getStory, variables: { _id: storyId } }]
    });

    this.props.navigation.navigate("home");
  };

  render() {
    return (
      <Query
        query={getStory}
        variables={{ _id: this.props.navigation.state.params._id }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator
                  size="small"
                  color={GlobalStyles.COLOR_PRIMARY_DARK}
                />
              </View>
            );
          if (error) return <Text>`Error! ${error.message}`</Text>;
          return (
            <StoryDetailComponent
              navigation={this.props.navigation}
              data={data}
              submitReview={this._submitReview}
              addToLibrary={this._addToLibrary}
            />
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(submitReview, { name: "submitReview" }),
  graphql(addToLibrary, { name: "addToLibrary" })
)(StoryDetailContainer);
