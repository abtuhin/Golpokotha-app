import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StoriesTrendingComponent from "../components/StoriesTrendingComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { Query } from "react-apollo";
import { getStories } from "../actions";

class StoriesTrendingContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Trending",
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
  }

  render() {
    return (
      <Query query={getStories}>
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
            <StoriesTrendingComponent
              navigation={this.props.navigation}
              data={data}
            />
          );
        }}
      </Query>
    );
  }
}

export default StoriesTrendingContainer;
