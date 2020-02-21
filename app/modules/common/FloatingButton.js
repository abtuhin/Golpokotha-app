import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { VectorIcon } from "../common";
import GlobalStyles, { Font } from "../../config/styles";

export const FloatingButton = ({ onPress = {} }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
      position: "absolute",
      bottom: 20,
      alignItems: "center",
      justifyContent: "center",
      elevation: 3,
      right: 20,
      zIndex: 100
    }}
  >
    <VectorIcon
      name={"plus"}
      color={"#ffffff"}
      size={20}
      iconType="FontAwesome"
    />
  </TouchableOpacity>
);
