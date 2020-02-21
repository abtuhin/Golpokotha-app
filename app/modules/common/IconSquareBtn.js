import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { VectorIcon } from "../common";
import GlobalStyles, { Font } from "../../config/styles";

class IconSquareBtn extends React.PureComponent {
  render() {
    const { name, iconType, onPress = () => {}, styles = {} } = this.props;
    return (
      <TouchableOpacity style={[$$.root, styles]} onPress={onPress}>
        <VectorIcon
          name={name}
          iconType={iconType}
          size={12}
          color={GlobalStyles.COLOR_SECONDARY_LIGHT}
        />
      </TouchableOpacity>
    );
  }
}

const $$ = {
  root: {
    backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
    padding: GlobalStyles.PADDING * 0.5,
    borderRadius: 6
  }
};

export { IconSquareBtn };
