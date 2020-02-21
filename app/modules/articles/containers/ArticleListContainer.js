import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchArticles } from "../actions";
import ArticleListComponent from "../components/ArticleListComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";

class ArticleListContainer extends Component {
	/**
		HEADER CONFIG
	*/

	static navigationOptions = ({ navigation, screenProps }) => {
		const { params = {} } = navigation.state;
		// var headerLeft = <NavigationBarIcon type="BACK" onPress={() => navigation.goBack()} />;
		// var headerRight = (
		// 	<NavigationBarIcon
		// 		type="DONE"
		// 		onPress={() => {
		// 			params.onSubmit();
		// 		}}
		// 	/>
		// );
		// if (params.isSaving) {
		// 	headerRight = <NavigationBarIcon type="LOADING" />;
		// }
		return {
			title: "Stack Screen Header",
			headerStyle: { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN },
			headerTitleStyle: [Font("normal", "bold", "medium"), { color: GlobalStyles.COLOR_LIGHTEST }],
			headerLeft: <NavigationBarIcon type="MENU" onPress={() => navigation.openDrawer()} />,
			headerRight: null
		};
	};

	/* END HEADER CONFIG */

	_fetchArticles = async () => {
		await this.props.fetchArticles();
	};
	render() {
		return <ArticleListComponent articles={this.props.articles} fetchArticles={this._fetchArticles} />;
	}
}

const mapStateToProps = store => {
	return {
		articles: store.articles.articles
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchArticles
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
