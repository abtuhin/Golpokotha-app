import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Pdf from "react-native-pdf";
import GlobalStyles, { Font } from "../../../config/styles";
import baseURL from "../../../config/network";

export default class StoryViewerComponent extends Component {
  render() {
    return (
      <Pdf
        source={{
          uri: baseURL + "/uploads/files/" + this.props.pdf,
          cache: true
        }}
        horizontal={true}
        fitWidth={true}
        spacing={2}
        enablePaging={true}
        activityIndicatorProps={{
          color: GlobalStyles.COLOR_PRIMARY_LIGHT,
          progressTintColor: GlobalStyles.COLOR_PRIMARY_DARK,
          height: 10
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        style={$$.pdf}
      />
    );
  }
}

const $$ = {
  pdf: {
    flex: 1,
    width: GlobalStyles.DEVICE_WIDTH,
    backgroundColor: GlobalStyles.COLOR_LIGHTEST,
    height: GlobalStyles.DEVICE_HEIGHT
  }
};
