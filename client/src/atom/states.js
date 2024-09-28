
import { atom } from "recoil";

export const userData = atom({
    key: 'userData', 
    default: null,
  });



export const allClinics = atom({
    key: 'allClinics', 
    default: [],
  });


  export const SidebarState = atom({
    key: 'SidebarState', 
    default: false,
  });