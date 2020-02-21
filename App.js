import React, { Component } from "react";
import { View, Text, StatusBar, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Root from "./app/routes";
import GlobalStyles from "./app/config/styles";
import { ApolloProvider } from "react-apollo";
import Client from "./app/libs/apollo";
import { LoginButton, AccessToken } from "react-native-fbsdk";

export default class App extends Component {
  // componentDidMount() {
  //   AsyncStorage.clear();
  // }
  render() {
    // return <View />;
    return (
      <ApolloProvider client={Client}>
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={GlobalStyles.COLOR_PRIMARY_DARK}
            barStyle="dark-content"
            translucent={false}
          />
          <Provider store={store}>
            <Root />
          </Provider>
        </View>
      </ApolloProvider>
    );
  }
}

//
// return (
//   <View>
//     <LoginButton
//       onLoginFinished={(error, result) => {
//         if (error) {
//           console.log("login has error: " + result.error);
//         } else if (result.isCancelled) {
//           console.log("login is cancelled.");
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//             console.log(data.accessToken.toString());
//           });
//         }
//       }}
//       onLogoutFinished={() => console.log("logout.")}
//     />
//   </View>
// );
