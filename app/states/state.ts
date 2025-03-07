"use client"
import React, { createContext, useContext } from 'react';

interface StateContextType {
    categories: [],
    setCategories: (data: []) => void
}
export const StateContext = createContext<StateContextType | undefined>(undefined);
export const useStateContext = function () {
    const stateContext = useContext(StateContext)
    if (!stateContext) {
        throw new Error('useMyContext must be used within a MyContext.Provider');
    }
    return stateContext;
}
