import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FBlogInWithReadPermissions, getUserFacebookInfo } from "../actions";
import FacebookLoginComponent from "../components/FacebookLoginComponent";
import GlobalStyles, { Font } from "../../../config/styles";
import { NavigationBarIcon } from "../../common";
import { graphql, compose } from "react-apollo";
import { addUser } from "../actions";

class FacebookLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBusy: false
    };
  }

  _loginUser = async user => {
    try {
      this.setState({ isBusy: true });
      let token = await AsyncStorage.getItem("FB_TOKEN");
      let res = await this.props.addUser({
        variables: {
          userId: user._id,
          name: user.name,
          dateOfBirth: user.birthday,
          gender: user.gender,
          profileImage:
            user.picture && user.picture.data && user.picture.data.url
              ? user.picture.data.url
              : "",
          token: token
        }
      });
      this.setState({ isBusy: false });
      if (res && res.data && res.data.addUser && res.data.addUser.token) {
        this.props.navigation.navigate("app");
      } else {
        alert("Something went wrong, try again later.", JSON.stringify(res));
      }
    } catch (e) {
      this.setState({ isBusy: false });
      console.log(e);
    }
  };

  _facebookLogin = async () => {
    try {
      let res = await this.props.FBlogInWithReadPermissions([
        "public_profile",
        "user_gender",
        "user_birthday"
      ]);

      await AsyncStorage.setItem("FB_TOKEN", res.accessToken);
      await AsyncStorage.setItem("FB_PERMS", JSON.stringify(res.permissions));

      let info = await this.props.getUserFacebookInfo();

      if (info) {
        this._loginUser(info);
      } else {
        alert("Something went wrong, try again later.", JSON.stringify(info));
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <FacebookLoginComponent
        navigation={this.props.navigation}
        facebookLogin={this._facebookLogin}
        isBusy={this.state.isBusy}
      />
    );
  }
}

// const mapStateToProps = store => {
// 	return {
// 		articles: store.articles.articles
// 	};
// };
//
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      FBlogInWithReadPermissions,
      getUserFacebookInfo
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(compose(graphql(addUser, { name: "addUser" }))(FacebookLoginContainer));
