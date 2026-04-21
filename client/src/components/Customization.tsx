/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

export const CustomizationContext = createContext({});

export const CustomizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [material, setMaterial] = useState("null");

  return (
    <CustomizationContext.Provider
      value={{
        material,
        setMaterial,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  return context;
};
