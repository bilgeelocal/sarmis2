import { createContext, useContext, useEffect, useState } from "react";

interface ITab {
  setActiveTab: (num: number) => void;
  activeTab: number;
}

const TabContext = createContext<ITab>({
  setActiveTab: () => {},
  activeTab: 0,
});

export const TabProvider: React.FC<{
  children: any;
}> = ({ children }): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // useEffect(() => {}, []);

  return <TabContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabContext.Provider>;
};

export const useTab: () => {
  setActiveTab: (val: number) => void;
  activeTab: number;
} = () => {
  return useContext(TabContext);
};
