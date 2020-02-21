import React from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import GlobalStyles from "../../config/styles";
import { VectorIcon } from "../common";

export const NavigationBarIcon = ({
  type,
  onPress,
  customStyles = null,
  customIconStyles = null
}) => {
  switch (type) {
    case "SEARCH":
      return (
        <TouchableOpacity
          accessibilityLabel={"SEARCH"}
          style={styles.iconContainer}
          onPress={onPress}
        >
          <VectorIcon iconType="MaterialIcons" size={24} name="search" />
        </TouchableOpacity>
      );
    case "MENU":
      return (
        <TouchableOpacity
          accessibilityLabel={"MENU"}
          style={styles.iconContainer}
          onPress={onPress}
        >
          <VectorIcon iconType="MaterialIcons" size={24} name="menu" />
        </TouchableOpacity>
      );
    case "BACK":
      return (
        <TouchableOpacity
          accessibilityLabel={"BACK"}
          style={styles.iconContainer}
          onPress={onPress}
        >
          <VectorIcon iconType="MaterialIcons" size={24} name="arrow-back" />
        </TouchableOpacity>
      );
    case "DONE":
      return (
        <TouchableOpacity
          accessibilityLabel={"DONE"}
          style={[styles.iconContainer, customStyles]}
          onPress={onPress}
        >
          <VectorIcon iconType="MaterialIcons" size={24} name="done" />
        </TouchableOpacity>
      );

    case "DELETE":
      return (
        <TouchableOpacity
          accessibilityLabel={"DELETE"}
          style={[styles.iconContainer, customStyles]}
          onPress={onPress}
        >
          <VectorIcon iconType="MaterialIcons" size={24} name="delete" />
        </TouchableOpacity>
      );
    case "PUBLISH":
      return (
        <TouchableOpacity
          accessibilityLabel={"PUBLISH"}
          style={[styles.iconContainer, customStyles]}
          onPress={onPress}
        >
          <VectorIcon iconType="MaterialIcons" size={24} name="publish" />
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

const styles = {
  icon: { width: 20, height: 20 },
  iconContainer: {
    height: 35,
    paddingLeft: GlobalStyles.PADDING,
    paddingRight: GlobalStyles.PADDING,
    justifyContent: "center"
  }
};
