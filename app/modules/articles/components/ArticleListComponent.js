import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default class ArticleListComponent extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={() => this.props.fetchArticles()}>
					<Text>ki khbr tmr?</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
