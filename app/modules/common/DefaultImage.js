import React from "react";
import { Text, View } from "react-native";
import GlobalStyles, { Font } from "../../config/styles";
import CustomImage from "../../config/images";
import randomColor from "randomcolor";

export class DefaultImage extends React.Component {
	static defaultProps = {
		fullName: "",
		customContainer: null
	};

	shouldComponentUpdate() {
		return false;
	}

	render() {
		const { fullName, type = null, staticColor = "" } = this.props;
		let names = fullName.trim().split(" "),
			initials = "";
		if (names.length > 1) initials = names[0].charAt(0) + names[1].charAt(0);
		else initials = names[0].substring(0, 1);

		if (type) {
			return (
				<View style={this.props.customContainer || styles.imageContainer}>
					<CustomImage type={type.toUpperCase() + "_RED"} />
				</View>
			);
		} else {
			return (
				<View
					style={[
						this.props.customContainer || styles.container,
						{ backgroundColor: staticColor == "" ? randomColor() : staticColor }
					]}
				>
					<Text style={[styles.text, Font("normal", "bold", "large")]}>{initials ? initials.toUpperCase() : ""}</Text>
				</View>
			);
		}
	}
}

const styles = {
	container: {
		alignItems: "center",
		justifyContent: "center",
		width: 50,
		height: 50,
		borderRadius: 25
	},
	text: { color: GlobalStyles.COLOR_LIGHTEST },
	imageContainer: {
		borderRadius: 25,
		height: 50,
		width: 50,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: GlobalStyles.COLOR_LIGHT
	}
};
