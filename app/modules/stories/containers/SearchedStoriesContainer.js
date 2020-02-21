import React, { Component } from "react";
import { View, Text, ActivityIndicator, TextInput } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SearchedStoriesComponent from "../components/SearchedStoriesComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { graphql, compose, Query } from "react-apollo";
import { getAllStories } from "../actions";

class SearchedStoriesContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TextInput
          style={{
            color: "#fff"
          }}
          placeholderTextColor="#f0f0f0"
          placeholder={navigation.state.params.query || "Search story ..."}
          onChangeText={query => {
            if (query.length % 3 == 0) {
              navigation.state.params &&
                navigation.state.params.onSearchPress(query);
            }
            return;
          }}
        />
      ),
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
    this.state = {
      refreshing: false,
      skip: 0,
      page: 1,
      search: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      ...navigation.state.params,
      onSearchPress: this._onSearchPress
    });
    this.setState({ search: navigation.state.params.query });
  }

  _onSearchPress = async query => {
    await this.setState({
      refreshing: true,
      skip: 0,
      page: 1,
      search: query
    });
  };

  render() {
    return (
      <Query
        query={getAllStories}
        fetchPolicy="network-only"
        variables={{ first: 10, skip: 0, search: this.state.search }}
      >
        {({ loading, error, data, fetchMore }) => {
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
            <SearchedStoriesComponent
              navigation={this.props.navigation}
              data={data}
              loading={loading}
              refreshing={this.state.refreshing}
              onLoadMore={async () => {
                await this.setState({
                  skip: this.state.skip + 10,
                  page: this.state.page + 1
                });
                fetchMore({
                  variables: {
                    first: 10,
                    skip: this.state.skip,
                    search: this.state.search
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (
                      Math.ceil(previousResult.stories.count / 10) >
                      this.state.page
                    ) {
                      return previousResult; // this is necessary for performance, dont update unneccesarily
                    }

                    if (!fetchMoreResult) {
                      return previousResult;
                    }

                    let newObj = {
                      ...previousResult,
                      stories: {
                        ...previousResult.stories,
                        items: [
                          ...previousResult.stories.items,
                          ...fetchMoreResult.stories.items
                        ]
                      }
                    };
                    return { ...newObj };
                  }
                });
              }}
            />
          );
        }}
      </Query>
    );
  }
}
export default SearchedStoriesContainer;
