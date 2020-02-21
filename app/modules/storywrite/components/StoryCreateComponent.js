import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import GlobalStyles, { Font } from "../../../config/styles";
import { Button } from "../../common";

export default class StoryCreateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      section: ""
    };
  }

  componentDidMount() {
    if (this.props.currentItem._id) {
      this.setState({
        _id: this.props.currentItem._id,
        section: this.props.currentItem.section,
        content: this.props.currentItem.content
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentItem !== nextProps.currentItem) {
      this.setState({
        _id: nextProps.currentItem._id,
        section: nextProps.currentItem.section,
        content: nextProps.currentItem.content
      });
    }
  }

  render() {
    return (
      <View style={$$.container}>
        <ScrollView>
          <View style={$$.sectionInputContainer}>
            <TextInput
              value={this.state.section}
              placeholder="write section name ..."
              onChangeText={section => this.setState({ section })}
            />
          </View>
          <View style={$$.contentInputContainer}>
            <TextInput
              multiline={true}
              value={this.state.content}
              placeholder="write here..."
              onChangeText={content => this.setState({ content })}
            />
          </View>
        </ScrollView>
        <View style={$$.bottomButton}>
          {/* {this.props.currentItem.id &&
          this.props.sections[this.props.sections.length - 1].id ==
            this.props.currentItem.id ? ( */}
          <Button
            name="Update"
            styles={$$.publishButton}
            color={GlobalStyles.COLOR_PRIMARY_MAIN}
            onPress={() => this.props.onUpdateSection(this.state)}
          />
          {/* ) : (
            <Text>Update me</Text>
          )} */}
        </View>
      </View>
    );
  }
}

const $$ = {
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_LIGHT,
    margin: GlobalStyles.PADDING * 0.5
  },
  contentInputContainer: {
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER,
    padding: GlobalStyles.PADDING * 0.5,
    marginBottom: 2,
    minHeight: GlobalStyles.DEVICE_HEIGHT * 0.65
  },
  sectionInputContainer: {
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    borderWidth: 1,
    borderColor: GlobalStyles.COLOR_BORDER,
    padding: GlobalStyles.PADDING * 0.5,
    marginBottom: 2
  },
  publishButton: {
    elevation: 2
  },
  bottomButton: {
    minHeight: 50,
    marginTop: 2
  }
};
