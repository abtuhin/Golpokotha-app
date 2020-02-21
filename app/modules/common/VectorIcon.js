import React, { Component } from "react";
import { View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

class VectorIcon extends Component {
	render() {
		const { name = "", color = "#fff", size = 12, iconType = "MaterialIcons" } = this.props;

		switch (iconType) {
			case "MaterialIcons":
				return <MaterialIcons name={name} size={size} color={color} />;
			case "FontAwesome":
				return <FontAwesome name={name} size={size} color={color} />;
			case "SimpleLineIcons":
				return <SimpleLineIcons name={name} size={size} color={color} />;
			default:
				return null;
		}
	}
}

export { VectorIcon };
