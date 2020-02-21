import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StoryListByCategoryComponent from "../components/StoryListByCategoryComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { graphql, compose } from "react-apollo";
import { getStoryListByCategory } from "../actions";

class StoryListByCategoryContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.name || "",
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
    this.state = this._initState();
  }

  _initState = () => {
    return {
      loading: false,
      refreshing: false,
      skip: 0,
      page: 1
    };
  };

  _fetchData = async () => {
    await this.setState({ loading: true, page: this.state.page + 1 });
    let categoryId = this.props.navigation.state.params._id;
    await this.props.getStoryListByCategory.fetchMore({
      variables: {
        _id: categoryId,
        first: 10,
        skip: this.state.skip
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (
          Math.ceil(fetchMoreResult.category.stories.count / 10) ===
          this.state.page
        ) {
          return previousResult; // this is necessary for performance, dont update unneccesarily
        }
        if (!fetchMoreResult) {
          return previousResult;
        }

        let items = [
          ...previousResult.category.stories.items,
          ...fetchMoreResult.category.stories.items
        ];

        let newObj = {
          ...previousResult,
          category: {
            ...previousResult.category,
            stories: {
              ...previousResult.category.stories,
              items: items
            }
          }
        };
        return { ...newObj };
      }
    });

    this.setState({ loading: false });
  };

  _onLoadMore = () => {
    this.setState(
      state => ({ skip: state.skip + 10 }),
      () => {
        this._fetchData();
      }
    );
  };

  render() {
    return (
      <StoryListByCategoryComponent
        navigation={this.props.navigation}
        data={this.props.getStoryListByCategory}
        onLoadMore={this._onLoadMore}
        loading={this.state.loading}
      />
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
)(
  compose(
    graphql(getStoryListByCategory, {
      name: "getStoryListByCategory",
      options: props => ({
        variables: {
          _id: props.navigation.state.params._id,
          first: 10,
          skip: 0
        }
        // fetchPolicy: "cache-only"
      })
    })
  )(StoryListByCategoryContainer)
);
