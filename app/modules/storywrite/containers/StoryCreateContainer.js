import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StoryCreateComponent from "../components/StoryCreateComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { graphql, compose } from "react-apollo";
import { publishStory, updateSection } from "../actions";

class StoryCreateContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = ({ navigation, screenProps }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Write story",
      headerStyle: { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN },
      headerTitleStyle: [
        Font("normal", "bold", "medium"),
        { color: GlobalStyles.COLOR_LIGHTEST }
      ],
      headerLeft: (
        <NavigationBarIcon type="BACK" onPress={() => navigation.pop()} />
      ),
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <NavigationBarIcon
            type="PUBLISH"
            customStyles={{ paddingRight: GlobalStyles.PADDING * 0.5 }}
            onPress={() => navigation.navigate("publishStory")}
          />
          <NavigationBarIcon
            type="MENU"
            onPress={() => navigation.openDrawer()}
          />
        </View>
      )
    };
  };

  /* END HEADER CONFIG */

  constructor(props) {
    super(props);
    this.state = {};
  }

  _onUpdateSection = data => {
    this.props.updateSection(data);
  };

  render() {
    return (
      <StoryCreateComponent
        onUpdateSection={this._onUpdateSection}
        currentItem={this.props.currentItem}
        sections={this.props.sections}
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
      updateSection
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(graphql(publishStory, { name: "publishStory" }))(StoryCreateContainer)
);
