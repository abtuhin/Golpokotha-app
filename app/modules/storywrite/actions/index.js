import { gql } from "apollo-boost";
import axios from "axios";
import baseURL from "../../../config/network";

export const uploadImage = data => {
  var form = new FormData();
  form.append("imageUrl", {
    uri: data.uri,
    name: data.fileName || "file.PNG",
    type: "image/jpeg"
  });
  return async dispath => {
    try {
      let res = await axios.post(baseURL + "/upload", form);
      if (res.data) {
        return res.data;
      }
      return new Error("Problem uploading image");
    } catch (e) {
      console.log(e);
    }
  };
};

export const syncStorageDraft = data => {
  return {
    type: "SYNC_STORAGE_DRAFT",
    payload: { ...data }
  };
};

export const removeSection = (_id, index) => {
  return {
    type: "REMOVE_SECTION",
    payload: { _id, index }
  };
};

export const updateSection = data => {
  return {
    type: "UPDATE_STORY_SECTION",
    payload: data
  };
};

export const addSection = data => {
  return {
    type: "ADD_STORY_SECTION",
    payload: data
  };
};

export const setCurrentIndex = item => {
  return {
    type: "SET_CURRENT_INDEX",
    payload: item
  };
};

export const getCategories = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const publishStory = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $category: [ID!]
    $pdf: String!
  ) {
    addStory(
      title: $title
      category: $category
      imageUrl: $imageUrl
      pdf: $pdf
    ) {
      _id
    }
  }
`;
