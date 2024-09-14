
import { atom } from "recoil";

export const userData = atom({
    key: 'userData', 
    default: null,
  });



export const allStoriesState = atom({
    key: 'allStories', 
    default: [],
  });


  export const SidebarState = atom({
    key: 'SidebarState', 
    default: false,
  });