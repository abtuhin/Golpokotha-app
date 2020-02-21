const INITIAL_STATE = {
  sections: [],
  currentItem: {}
};

export const storyWriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RESET_STORY": {
      return {
        ...state,
        sections: [],
        currentItem: {}
      };
    }
    case "SYNC_STORAGE_DRAFT": {
      let sections = [...action.payload.sections];
      return {
        ...state,
        sections: sections,
        currentItem: sections.length > 0 ? sections[sections.length - 1] : 0
      };
    }
    case "ADD_STORY_SECTION": {
      return {
        ...state,
        sections: [...state.sections, action.payload],
        currentItem: { ...action.payload }
      };
    }
    case "SET_CURRENT_INDEX": {
      return {
        ...state,
        currentItem: { ...action.payload }
      };
    }
    case "REMOVE_SECTION": {
      let sections = [...state.sections];

      return {
        ...state,
        sections:
          sections.length - 1 == action.payload.index
            ? sections.slice(0, action.payload.index)
            : [...sections]
                .filter(item => item._id !== action.payload._id)
                .map((item, index) => {
                  return {
                    ...item,
                    section: item.section.replace(
                      new RegExp("[0-9]", "g"),
                      index + 1
                    )
                  };
                }),
        currentItem:
          action.payload.index == 0
            ? { ...sections[action.payload.index + 1] }
            : { ...sections[action.payload.index - 1] }
      };
    }
    case "UPDATE_STORY_SECTION": {
      let sections = [...state.sections];
      let newData = sections.map(item => {
        if (item._id === action.payload._id) {
          return action.payload;
        } else {
          return item;
        }
      });

      return {
        ...state,
        sections: newData
      };
    }
    default:
      return state;
  }
};
