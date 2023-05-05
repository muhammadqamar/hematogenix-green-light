/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allItems: null,
  itemReadyInventory: null,
  itemExpiredInventory: null,
  itemDamagedInventory: null,
  itemLostInventory: null,
  itemDisposedInventory: null,
  itemDeletedInventory: null,
  itemUsedInventory: null,

  allInventorylanguages: null,
};

export const item = createSlice({
  name: "items",
  initialState,
  reducers: {
    setAllItemsReducer: (state, action) => {
      state.allItems = action.payload;
    },

    updateReadyCount: (state, action) => {
      console.log(action)
      state.allItems = state.allItems?.map(data=>{
        if(data.id === action.payload?.item?.id) {
          return   {...data, ready:action.payload?.quantity+data.ready }
        } else {
          return data
        }
      })
    },

    addNewItemsReducer: (state, action) => {
      if (state.allItems) {
        state.allItems = [action.payload, ...state.allItems];
      } else {
        state.allItems = [action.payload];
      }
    },
    updateItemReducer: (state, action) => {
      state.allItems = state.allItems.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },

    addItemReadyInventoryReducer: (state, action) => {
      state.itemReadyInventory = action.payload;
    },
    addItemExpiredInventoryReducer: (state, action) => {
      state.itemExpiredInventory = action.payload;
    },
    addItemDamagedInventoryReducer: (state, action) => {
      state.itemDamagedInventory = action.payload;
    },
    addItemLostInventoryReducer: (state, action) => {
      state.itemLostInventory = action.payload;
    },
    addItemDisposedInventoryReducer: (state, action) => {
      state.itemDisposedInventory = action.payload;
    },
    addItemDeletedInventoryReducer: (state, action) => {
      state.itemDeletedInventory = action.payload;
    },
    addItemUsedInventoryReducer: (state, action) => {
      state.itemUsedInventory = action.payload;
    },

    deleteLanguageReducer: (state, action) => {
      state.allItems = state.allItems?.map((data) => {
        if (data.id === action.payload.itemId) {
          return {
            ...data,
            translations: data?.translations?.filter((f) => f.id !== action.payload.langId),
          };
        } else {
          return data;
        }
      });
    },
    deleteItemsReducer: (state, action) => {
      state.allItems = state.allItems?.filter((data) => data.id !== action.payload);
    },
    // edit inventory states
    editItemInventoryReducer: (state, action) => {
      const time = new Date();
      if (action.payload.reducer !== "itemReadyInventory") {
        const currentTime =  new Date()
        state[action.payload.reducer] = [
          {
            ...action.payload.data,
            quantity: action.payload.quantity,
            createdUtc: currentTime.toLocaleTimeString()

          },
          ...state[action.payload.reducer],
        ];
      }
      state.itemReadyInventory = state.itemReadyInventory?.map((data) => {
        if (data.id === action.payload.id) {
          return { ...data, quantity: data.quantity - action.payload.quantity };
        } else {
          return data;
        }
      });
    },

    editItemExpireInventoryReducer: (state, action) => {
      const time = new Date();
      state.itemReadyInventory = state.itemReadyInventory?.filter(
        (data) => data.id !== action.payload.id
      );
      if (action.payload.reducer !== "itemReadyInventory") {
        state[action.payload.reducer] = [
          {
            ...action.payload.data,
            quantity: action.payload.quantity,
            createdUtc: time.toISOString(),
          },
          ...state[action.payload.reducer],
        ];
      }
    },

    editMoveItemInventoryReducer: (state, action) => {
      const time = new Date();
      if (action.payload.reducer !== "itemReadyInventory" ) {
         if(action.payload.reducer) {
        state[action.payload.reducer] = [
          {
            ...state.action.payload,
            quantity: action.payload.quantity,
            createdUtc: time.toISOString(),
          },
          ...state[action.payload.reducer],
        ];
      }}
      var foundItem;

      state.itemReadyInventory = state.itemReadyInventory?.map((data) => {
        if (data.id === action.payload.id) {
          foundItem = data;
          return { ...data, quantity: data.quantity - action.payload.quantity };
        } else {
          return data;
        }
      });
      // state.itemReadyInventory = [...state.itemReadyInventory,{...foundItem, quantity:action.payload.quantity}]
    },

    addNewVersiontoItemReducer: (state, action) => {
      state.allItems = state.allItems.map((item) => {
        if (item.id === action.payload.itemid) {
          return {
            ...item,
            translations: [
              ...item.translations,
              {
                name: action.payload.data.language.name,
                id: action.payload.data.language.id,
                itemName: action.payload.data.name,
                itemDescription: action.payload.data.description,
              },
            ],
          };
        } else {
          return item;
        }
      });
    },

    editNewVersiontoItemReducer: (state, action) => {
      state.allItems = state.allItems.map((item) => {
        if (item.id === action.payload.itemid) {
          const allTranslation = item.translations.map((tran) => {
            if (tran.id === action.payload.data.language.id) {
              return {
                name: action.payload.data.language.name,
                id: action.payload.data.language.id,
                itemName: action.payload.data.name,
                itemDescription: action.payload.data.description,
              };
            } else {
              return tran;
            }
          });
          return {
            ...item,
            translations: allTranslation,
          };
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  addItemReservedInventoryReducer,
  setAllItemsReducer,
  addNewItemsReducer,
  updateItemReducer,
  addItemReadyInventoryReducer,
  addItemDamagedInventoryReducer,
  addItemExpiredInventoryReducer,
  addItemLostInventoryReducer,
  addItemDisposedInventoryReducer,
  addItemUsedInventoryReducer,
  addItemDeletedInventoryReducer,
  editItemInventoryReducer,
  addNewVersiontoItemReducer,
  editNewVersiontoItemReducer,
  editMoveItemInventoryReducer,
  editItemExpireInventoryReducer,
  deleteItemsReducer,
  deleteLanguageReducer,
  updateReadyCount
} = item.actions;

export default item.reducer;
