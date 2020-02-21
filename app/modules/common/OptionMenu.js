import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { VectorIcon } from "../common";
import GlobalStyles, { Font } from "../../config/styles";

class OptionMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this._menu = null;
	}

	setMenuRef = ref => {
		this._menu = ref;
	};

	hideMenu = () => {
		this._menu.hide();
	};

	showMenu = () => {
		this._menu.show();
	};

	componentWillUnmount() {
		this._menu = null;
	}

	render() {
		const { items } = this.props;

		return (
			<Menu
				style={$$.container}
				ref={c => (this._menu = c)}
				button={
					<TouchableOpacity onPress={this.showMenu}>
						<VectorIcon
							iconType="SimpleLineIcons"
							size={18}
							name="options-vertical"
							color={GlobalStyles.COLOR_PRIMARY_DARK}
						/>
					</TouchableOpacity>
				}
			>
				{items.map((item, index) => {
					return (
						<MenuItem key={index} onPress={item.onPress}>
							<Text style={[Font("normal", "bold", "medium"), $$.itemText]}>{item.name}</Text>
						</MenuItem>
					);
				})}
			</Menu>
		);
	}
}

const $$ = {
	container: {
		borderWidth: 2,
		borderColor: GlobalStyles.COLOR_LIGHT,
		elevation: 2,
		backgroundColor: GlobalStyles.COLOR_LIGHTEST
	},
	itemText: {
		color: GlobalStyles.COLOR_PRIMARY_DARK
	}
};

export { OptionMenu };
