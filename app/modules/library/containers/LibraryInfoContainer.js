import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LibraryInfoComponent from "../components/LibraryInfoComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { Query } from "react-apollo";
import { getLibrary } from "../actions";

class LibraryInfoContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    // var headerLeft = <NavigationBarIcon type="BACK" onPress={() => navigation.goBack()} />;
    // var headerRight = (
    // 	<NavigationBarIcon
    // 		type="DONE"
    // 		onPress={() => {
    // 			params.onSubmit();
    // 		}}
    // 	/>
    // );
    // if (params.isSaving) {
    // 	headerRight = <NavigationBarIcon type="LOADING" />;
    // }
    return {
      title: "Library",
      headerStyle: { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN },
      headerTitleStyle: [
        Font("normal", "bold", "medium"),
        { color: GlobalStyles.COLOR_LIGHTEST }
      ],
      headerLeft: (
        <NavigationBarIcon
          type="MENU"
          onPress={() => navigation.openDrawer()}
        />
      ),
      headerRight: null
    };
  };

  /* END HEADER CONFIG */

  constructor(props) {
    super(props);
    this.state = {
      selected: "read"
    };
  }

  // _setSelected = data => {
  //   this.setState({ selected: data }, () => {});
  // };

  render() {
    return (
      <Query query={getLibrary}>
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
          // console.log(data);
          // client.writeDate();

          return (
            <LibraryInfoComponent
              data={data}
              // selected={this.state.selected}
              // onSelected={data => this._setSelected(data)}
              navigation={this.props.navigation}
            />
          );
        }}
      </Query>
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

export default LibraryInfoContainer;
