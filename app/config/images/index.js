import React from "react";
import { Image } from "react-native";

const images = {};

class CustomImage extends React.PureComponent {
	render() {
		const { type, styles = { height: 25, width: 25 }, dimensions = null, source = null } = this.props;
		let newHeight = dimensions
			? Math.round(dimensions.originalHeight / dimensions.originalWidth * dimensions.newWidth)
			: 0;

		return (
			<Image
				style={[styles, dimensions ? { height: newHeight, width: dimensions.newWidth } : null]}
				source={source ? source : images[type]}
			/>
		);
	}
}

export default CustomImage;
