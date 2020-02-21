import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationActions } from "react-navigation";
import { VectorIcon, Button } from "../../common";
import Image from "../../../config/images";
import { setCurrentIndex, removeSection, addSection } from "../actions";

class StoryDrawerContainer extends Component {
  /**
		HEADER CONFIG
	*/

  static navigationOptions = {
    headerMode: false
  };

  /* END HEADER CONFIG */

  componentDidMount() {
    let params = this.props.navigation.state.params;

    if (!params) {
      this.props.addSection({
        _id: new Date().toISOString(),
        section: "Chapter " + (this.props.sections.length + 1),
        content: ""
      });
    } else {
    }
  }

  _renderItem = ({ _id, section, content, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.props.setCurrentIndex({ _id, section, content });
          this.props.navigation.closeDrawer();
        }}
        style={styles.item}
      >
        <View style={styles.iconContainer}>
          <VectorIcon
            name={"keyboard-arrow-right"}
            iconType={"MaterialIcons"}
            color={GlobalStyles.COLOR_PRIMARY_DARK}
            size={22}
          />
        </View>
        <Text
          style={[
            styles.itemTitle,
            Font("normal", "normal", "large"),
            {
              color: GlobalStyles.COLOR_DARKEST
            }
          ]}
        >
          {section}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.removeSection(_id, index)}
          style={styles.iconContainer}
          // disabled={index == 0 ? true : false}
        >
          <VectorIcon
            name={"delete"}
            iconType={"MaterialIcons"}
            color={GlobalStyles.COLOR_SECONDARY_DARK}
            size={22}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <DrawerLogoContainer /> */}

        <View style={styles.itemContainer}>
          {this.props.sections.map((item, index) => {
            return this._renderItem({ ...item, index });
          })}
        </View>

        <Button
          onPress={() => {
            this.props.addSection({
              _id: new Date().toISOString(),
              section: "Chapter " + (this.props.sections.length + 1),
              content: ""
            });
          }}
          styles={styles.addButton}
          name="Add Chapter"
          icon={{ name: "plus", type: "FontAwesome" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    marginVertical: GlobalStyles.PADDING,
    borderRadius: 40,
    width: "80%",
    alignSelf: "center"
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    padding: GlobalStyles.PADDING,
    justifyContent: "center"
  },
  itemContainer: {
    padding: GlobalStyles.PADDING * 0.5
  },
  iconContainer: {
    // height: 35,
    // width: 35,
    // justifyContent: "center",
    // alignItems: "center"
  },
  icon: {
    height: 30,
    width: 30
  },
  itemTitle: { flex: 1 },
  avatarContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: GlobalStyles.PADDING * 0.5
  }
});

const mapStateToProps = store => {
  return {
    sections: store.storyWrite.sections
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrentIndex,
      addSection,
      removeSection
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryDrawerContainer);
