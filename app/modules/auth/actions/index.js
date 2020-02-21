import axios from "axios";
import { AsyncStorage } from "react-native";
import { gql } from "apollo-boost";
import { LoginManager, AccessToken } from "react-native-fbsdk";

export const FBlogInWithReadPermissions = (permissions = []) => {
  // isCancelled, declinedPermissions, grantedPermissions
  return async dispatch => {
    dispatch({ type: "LOGIN_READ_PERMISSION_PENDING" });
    try {
      let result = await LoginManager.logInWithReadPermissions(permissions);

      if (!result.isCancelled) {
        let fbRes = await AccessToken.getCurrentAccessToken();

        dispatch({
          type: "LOGIN_READ_PERMISSION_RESOLVED",
          payload: fbRes
        });
        return fbRes;
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const getUserFacebookInfo = () => {
  return async dispatch => {
    dispatch({ type: "GET_INFO_PENDING" });
    try {
      let token = await AsyncStorage.getItem("FB_TOKEN");
      let res = await axios.get(
        `https://graph.facebook.com/me?fields=id,picture{url},birthday,gender,name`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      dispatch({ type: "GET_INFO_RESOLVED", payload: res });
      if (res && res.data) return res.data;
      else return null;
    } catch (e) {
      dispatch({ type: "GET_INFO_FAILED" });
      console.log(e);
    }
  };
};

export const addUser = gql`
  mutation(
    $userId: String!
    $name: String!
    $dateOfBirth: String
    $profileImage: String
    $gender: String
    $token: String!
  ) {
    addUser(
      userId: $userId
      name: $name
      dateOfBirth: $dateOfBirth
      profileImage: $profileImage
      gender: $gender
      token: $token
    ) {
      token
    }
  }
`;
