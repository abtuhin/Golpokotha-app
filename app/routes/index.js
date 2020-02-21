import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  TextInput
} from "react-native";
import GlobalStyles, { Font } from "../config/styles";
import {
  createStackNavigator,
  TabNavigator,
  withNavigationFocus,
  createDrawerNavigator,
  createTabNavigator,
  TabBarBottom
} from "react-navigation";
import SideMenu from "../modules/drawer";
import { NavigationBarIcon, VectorIcon } from "../modules/common";

import ArticleListContainer from "../modules/articles/containers/ArticleListContainer";
import LibraryInfoContainer from "../modules/library/containers/LibraryInfoContainer";
import StoriesTrendingContainer from "../modules/stories/containers/StoriesTrendingContainer";
import SearchedStoriesContainer from "../modules/stories/containers/SearchedStoriesContainer";
import StoryDetailContainer from "../modules/stories/containers/StoryDetailContainer";
import StoryListByCategoryContainer from "../modules/stories/containers/StoryListByCategoryContainer";
import FacebookLoginContainer from "../modules/auth/containers/FacebookLoginContainer";
import StoryViewerContainer from "../modules/stories/containers/StoryViewerContainer";

import MyStoriesContainer from "../modules/storywrite/containers/MyStoriesContainer";
import StoryCreateContainer from "../modules/storywrite/containers/StoryCreateContainer";
import StoryPublishContainer from "../modules/storywrite/containers/StoryPublishContainer";
import StoryDrawer from "../modules/storywrite/containers/StoryDrawerContainer";

const _navigationOptions = (title, headerLeft = null, headerRight = null) => ({
  headerTitle: title,
  headerStyle: [
    { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN }
    // Platform.OS === "ios" && GlobalStyles.DEVICE_HEIGHT === 812 ? { marginTop: -44 } : {}
  ],
  headerTitleStyle: [
    Font("normal", "bold", "medium"),
    { color: GlobalStyles.COLOR_LIGHTEST }
  ],
  headerLeft: headerLeft,
  headerRight: headerRight
});

class TrendingScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Trending",
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      jumpToIndex(0);
    },
    tabBarIcon: ({ tintColor, focused }) => (
      <VectorIcon
        name="trending-up"
        iconType="MaterialIcons"
        color={tintColor}
        size={20}
      />
    )
  });
  render = () => {
    return this.props.isFocused ? (
      <StoriesTrendingContainer navigation={this.props.navigation} />
    ) : null;
  };
}

class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Category",
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      jumpToIndex(1);
    },
    tabBarIcon: ({ tintColor, focused }) => (
      <VectorIcon
        name="view-list"
        iconType="MaterialIcons"
        color={tintColor}
        size={20}
      />
    )
  });

  render = () => {
    return this.props.isFocused ? (
      <ArticleListContainer navigation={this.props.navigation} />
    ) : null;
  };
}

class ArchiveScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: "Archive",
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      jumpToIndex(2);
    },
    tabBarIcon: ({ tintColor, focused }) => (
      <VectorIcon
        name="archive"
        iconType="MaterialIcons"
        color={tintColor}
        size={20}
      />
    )
  });

  render = () => {
    return this.props.isFocused ? (
      <ArticleListContainer navigation={this.props.navigation} />
    ) : null;
  };
}

const TabBarComponent = props => {
  return <TabBarBottom {...props} />;
};

const TabNav = createTabNavigator(
  {
    // tabHome: { screen: withNavigationFocus(HomeScreen) },
    Trending: { screen: withNavigationFocus(TrendingScreen) },
    Category: { screen: withNavigationFocus(CategoryScreen) },
    Archive: { screen: withNavigationFocus(ArchiveScreen) }
  },
  {
    tabBarComponent: props => (
      <TabBarComponent
        {...props}
        style={{
          borderTopColor: GlobalStyles.COLOR_LIGHTER,
          backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN
        }}
      />
    ),
    tabBarPosition: "bottom",
    animationEnabled: true,
    lazy: false,
    swipeEnabled: false,
    initialRouteName: "Trending",
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      labelStyle: Font("normal", "bold", "smaller"),
      activeTintColor: GlobalStyles.COLOR_DARKEST,
      inactiveTintColor: GlobalStyles.COLOR_LIGHTEST,
      activeBackgroundColor: GlobalStyles.COLOR_LIGHTEST,
      inactiveBackgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
      indicatorStyle: { backgroundColor: GlobalStyles.COLOR_SECONDARY },
      style: [
        {
          backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN,
          shadowOpacity: 0.75,
          shadowRadius: 2,
          shadowColor: GlobalStyles.COLOR_DARK,
          shadowOffset: { height: 0, width: 0 }
        },
        Platform.OS === "ios" && GlobalStyles.DEVICE_HEIGHT === 812
          ? { marginVertical: -34 }
          : {}
      ],
      tabStyle: {
        // paddingTop: GlobalStyles.PADDING * 0.5,
        // paddingBottom: GlobalStyles.PADDING * 0.5
      }
    }
  }
);

// const HomeTabs = createStackNavigator(
// 	{
// 		tabScreen: {
// 			screen: TabNav
// 		}
// 	},
// 	{
// 		headerMode: "none"
// 	}
// );

const StoryDrawerScreens = createStackNavigator({
  createStory: {
    screen: StoryCreateContainer
  }
});

const StoryDrawerNavigator = createDrawerNavigator(
  {
    drawer: {
      screen: StoryDrawerScreens
    }
  },
  {
    drawerPosition: "right",
    headerMode: "none",
    contentComponent: props => {
      return (
        <ScrollView>
          <StoryDrawer {...props} />
        </ScrollView>
      );
    },
    drawerWidth:
      GlobalStyles.DEVICE_WIDTH < 1024 ? GlobalStyles.DEVICE_WIDTH * 0.75 : 0.5
  }
);

const StoryCreationDrawer = createStackNavigator(
  {
    storyCreationRoot: {
      screen: MyStoriesContainer
    },
    storyDrawer: {
      screen: StoryDrawerNavigator,
      navigationOptions: {
        header: null
      }
    },
    publishStory: {
      screen: StoryPublishContainer
    }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => {
      return {
        title: "Write Story",
        headerStyle: { backgroundColor: GlobalStyles.COLOR_PRIMARY_MAIN },
        headerTitleStyle: [
          Font("normal", "bold", "medium"),
          { color: GlobalStyles.COLOR_LIGHTEST }
        ],
        headerLeft: (
          <NavigationBarIcon type="BACK" onPress={() => navigation.goBack()} />
        ),
        headerRight: null
      };
    }
  }
);

const DrawerScreens = createStackNavigator(
  {
    home: {
      screen: TabNav,
      navigationOptions: ({ navigation }) => {
        return _navigationOptions(
          <TextInput
            style={{
              color: "#fff"
            }}
            placeholderTextColor="#f0f0f0"
            placeholder="Search story ..."
            onChangeText={query => {
              navigation.setParams({ query });
            }}
          />,
          <NavigationBarIcon
            type="MENU"
            onPress={() => navigation.openDrawer()}
          />,
          <NavigationBarIcon
            type="SEARCH"
            onPress={() => {
              if (navigation.state.params && navigation.state.params.query) {
                navigation.navigate("search", {
                  query: navigation.state.params.query
                });
              } else {
                navigation.navigate("search", {
                  query: ""
                });
              }
            }}
          />
        );
      }
    },
    search: {
      screen: SearchedStoriesContainer
    },
    library: {
      screen: LibraryInfoContainer
    },
    update: {
      screen: ArticleListContainer
    },
    writeStory: {
      screen: StoryCreationDrawer,
      navigationOptions: {
        header: null
      }
    },
    storyDetail: {
      screen: StoryDetailContainer
    },
    pdfReader: {
      screen: StoryViewerContainer
    },
    storyListByCategory: {
      screen: StoryListByCategoryContainer
    }
  },
  {
    initialRouteName: "home"
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    home: { screen: DrawerScreens }
  },
  {
    headerMode: "none",
    contentComponent: props => {
      return (
        <ScrollView>
          <SideMenu
            {...props}
            // activeTintColor="yellow"
            // activeBackgroundColor="rgba(0, 0, 0, .04)"
            // inactiveTintColor="red"
            // inactiveBackgroundColor="transparent"
            // style={{ backgroundColor: "#000000" }}
            // labelStyle={{ color: "#ffffff" }}
          />
        </ScrollView>
      );
    },
    drawerWidth:
      GlobalStyles.DEVICE_WIDTH < 1024 ? GlobalStyles.DEVICE_WIDTH * 0.75 : 0.5
  }
);

const AuthStack = createStackNavigator(
  {
    fbLogin: {
      screen: FacebookLoginContainer
    }
  },
  {
    headerMode: "none"
  }
);

export default createStackNavigator(
  {
    auth: {
      screen: AuthStack
    },
    app: {
      screen: DrawerNavigator
    },
    test: { screen: LibraryInfoContainer }
  },
  {
    headerMode: "none",
    initialRouteName: "app"
  }
);
