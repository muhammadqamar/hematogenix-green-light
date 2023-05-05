/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProtocols: null,
  selectedProtocol: null,
  selectedProtocolDetail: null,

  allRegionsProtocol: [],
  allLowerLeveltree: null,
  selectedrule: [],
  selectedRegion: null,
  selectedRegionDetail: null,

  allCountriesProtocol: null,
  selectedCountry: null,
  selectedCountryDetail: null,

  allSitesProtocol: null,
  selectedSite: null,
  selectedSiteDetail: null,
  selectKitToAssign: [],

  allShippingDeports: null,
  allGreenTypeTypes: null,
  users: null,
  unConfigSite: null,
  kitAtlevels: null,
};

export const Logistic = createSlice({
  name: 'kit-builder',
  initialState,
  reducers: {
    updateSiteList: (state, action) => {
      if (state.allSitesProtocol) {
        state.allSitesProtocol = [...state.allSitesProtocol, action.payload];
      } else {
        state.allSitesProtocol = action.payload;
      }
    },
    setShiipingDeports: (state, action) => {
      state.allShippingDeports = action.payload;
    },

    removeKitfromList: (state, action) => {
      state.selectedProtocolDetail = {
        ...state.selectedProtocolDetail,
        logisticBuilderKits: state.selectedProtocolDetail?.logisticBuilderKits?.filter((data) => data.id !== action.payload),
      };
    },

    addNewRegionProtocols: (state, action) => {
      if (state.allRegionsProtocol) {
        state.allRegionsProtocol = [...state.allRegionsProtocol, action.payload];
      } else {
        state.allRegionsProtocol = action.payload;
      }
    },

    removeKitfromKitAssemblyList: (state, action) => {
      state.selectedProtocolDetail = {
        ...state.selectedProtocolDetail,
        logisticBuilderKits: state.selectedProtocolDetail?.logisticBuilderKits?.map((data) => {
          if (data.id === action.payload.kitId) {
            console.log(data?.assemblies);
            return {
              ...data,
              assemblies: data?.assemblies?.filter((assemb) => assemb.id !== action.payload.id),
            };
          } else {
            return data;
          }
        }),
      };
    },

    addnewAssemblytoKit: (state, action) => {
      state.selectedProtocolDetail = {
        ...state.selectedProtocolDetail,
        logisticBuilderKits: state.selectedProtocolDetail?.logisticBuilderKits?.map((data) => {
          if (data.id === action.payload.kitId) {
            if (data.assemblies) {
              return {
                ...data,
                assemblies: [...data.assemblies, ...action.payload?.data],
              };
            } else {
              return data;
            }
          } else {
            return data;
          }
        }),
      };
    },
    activeUsers: (state, action) => {
      state.users = action.payload;
    },
    kitAtlevel: (state, action) => {
      state.kitAtlevels = action.payload;
    },
    setGreenLights: (state, action) => {
      state.allGreenTypeTypes = action.payload;
    },
    setAllProtocols: (state, action) => {
      state.allProtocols = action.payload;
    },
    setSelectedProtocol: (state, action) => {
      state.selectedProtocol = action.payload;
    },
    setSelectedProtocolDetail: (state, action) => {
      state.selectedProtocolDetail = action.payload;
    },

    setAllRegionProtocols: (state, action) => {
      state.allRegionsProtocol = action.payload;
    },
    getAlllowerLeveltreeReducer: (state, action) => {
      state.allLowerLeveltree = action.payload;
    },
    setSelectedRule: (state, action) => {
      const existingObj = state.selectedrule.find((obj) => obj.id === action.payload.id);
      if (existingObj) {
        // replace the existing object with the new object
        state.selectedrule = state.selectedrule?.filter((f) => f.id !== existingObj.id);
        // state.selectedrule[index] = action.payload.id;
      } else {
        // add the new object to the array
        state.selectedrule.push(action.payload);
      }
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },

    setSelectedProtocolKitDetail: (state, action) => {
      state.selectedProtocolDetail = {
        ...state.selectedProtocolDetail,
        logisticBuilderKits: action.payload,
      };
    },
    setSelectedRegionDetail: (state, action) => {
      state.selectedRegionDetail = action.payload;
    },

    setAllCountryProtocol: (state, action) => {
      state.allCountriesProtocol = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSelectedCountryDetail: (state, action) => {
      state.selectedCountryDetail = action.payload;
    },

    setAllSiteProtocol: (state, action) => {
      state.allSitesProtocol = action.payload;
    },
    setSelectedSite: (state, action) => {
      state.selectedSite = action.payload;
    },
    setSelectedSiteDetail: (state, action) => {
      state.selectedSiteDetail = action.payload;
    },
    resetSelectedRule: (state, action) => {
      state.selectedrule = action.payload;
    },
    setSelectedKitToAssign: (state, action) => {
      // const existingObj = state.selectKitToAssign.find((obj) => obj.id === action.payload.id);
      // if (existingObj) {
      //   // replace the existing object with the new object
      //   state.selectKitToAssign = state.selectKitToAssign?.filter((f) => f.id !== existingObj.id);
      //   // state.selectKitToAssign[index] = action.payload.id;
      // } else {
      //   // add the new object to the array
      //   state.selectKitToAssign.push(action.payload);
      // }
      if (action.payload.type === 'study') {
        state.selectedProtocolDetail = {
          ...state.selectedProtocolDetail,
          logisticBuilderKits: state.selectedProtocolDetail?.logisticBuilderKits?.map((data) => {
            if (data.id === action.payload.data.id) {
              console.log(data?.assemblies);
              return action.payload.data;
            } else {
              return data;
            }
          }),
        };
      } else if (action.payload.type === 'region') {
        state.selectedRegionDetail = {
          ...state.selectedRegionDetail,
          logisticBuilderKits: state.selectedRegionDetail?.logisticBuilderKits?.map((data) => {
            if (data.id === action.payload.data.id) {
              console.log(data?.assemblies);
              return action.payload.data;
            } else {
              return data;
            }
          }),
        };
      } else if ((action.payload.type = 'country')) {
        state.selectedCountryDetail = {
          ...state.selectedCountryDetail,
          logisticBuilderKits: state.selectedCountryDetail?.logisticBuilderKits?.map((data) => {
            if (data.id === action.payload.data.id) {
              console.log(data?.assemblies);
              return action.payload.data;
            } else {
              return data;
            }
          }),
        };
      }
    },
    unConfigCountrySite: (state, action) => {
      state.unConfigSite = state.selectedProtocolDetail?.unconfiguredSites?.filter((site) => site.country.id === state?.selectedCountryDetail?.country?.id);
    },
    setcountryConfigured: (state, action) => {
      state.allCountriesProtocol = state.allCountriesProtocol?.map((country) => {
        if (country.countryId === action.payload.id) {
          console.log('raja');
          return {
            ...country,
            isConfigured: true,
          };
        } else {
          return country;
        }
      });
    },
  },
});

export const {
  addNewRegionProtocols,
  removeKitfromList,
  kitAtlevel,
  activeUsers,
  setSelectedCountryDetail,
  setAllProtocols,
  setSelectedProtocol,
  setSelectedProtocolDetail,
  setAllRegionProtocols,
  setAllSiteProtocol,
  setSelectedRegion,
  setSelectedSiteDetail,
  setAllCountryProtocol,
  setSelectedRegionDetail,
  setSelectedCountry,
  setSelectedSite,
  setSelectedRule,
  getAlllowerLeveltreeReducer,
  resetSelectedRule,
  setSelectedKitToAssign,
  setShiipingDeports,
  setGreenLights,
  updateSiteList,
  setSelectedProtocolKitDetail,
  removeKitfromKitAssemblyList,
  addnewAssemblytoKit,
  unConfigCountrySite,
  setcountryConfigured,
} = Logistic.actions;

export default Logistic.reducer;
