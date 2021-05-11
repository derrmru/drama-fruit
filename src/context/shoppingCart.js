import { createContext } from 'react';

export const ShoppingContext = createContext({
  items: {},
  itemsSetter: () => {}
});

export const ShoppingProvider = ShoppingContext.Provider

export default ShoppingContext