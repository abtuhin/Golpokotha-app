import React, { Component } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import GlobalStyles, { Font } from "../../config/styles";
import { VectorIcon } from "../common";

class Button extends React.Component {
  render() {
    const {
      name,
      onPress,
      styles = {},
      icon = null,
      isBusy = false,
      disabled = false
    } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[$$.rootContainer, styles]}
      >
        {!isBusy ? (
          <View style={$$.container}>
            <Text style={[Font("normal", "bold", "medium"), $$.text]}>
              {name}
            </Text>
            {icon && (
              <VectorIcon
                name={icon.name}
                iconType={icon.type}
                color={GlobalStyles.COLOR_SECONDARY_LIGHT}
                size={15}
              />
            )}
          </View>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </TouchableOpacity>
    );
  }
}

const $$ = {
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
    alignItems: "center",
    justifyContent: "center",
    padding: GlobalStyles.PADDING
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    color: GlobalStyles.COLOR_LIGHTEST,
    marginRight: GlobalStyles.PADDING * 0.5
  }
};

export { Button };
