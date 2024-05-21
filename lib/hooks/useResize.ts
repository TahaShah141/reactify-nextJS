import { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export function useResize(tab: string) {
  const fullWidthTabs = ["Code Preview", "Settings"];
  const sidebarRef = useRef<ImperativePanelHandle>();
  const mainRef = useRef<ImperativePanelHandle>();
  const selectMenuRef = useRef<ImperativePanelHandle>();
  const [saved, setSaved] = useState([20, 60]);

  useEffect(() => {
    if (!selectMenuRef.current || !mainRef.current) return;

    const needsFullWidth = fullWidthTabs.includes(tab);
    if (needsFullWidth) {
      setSaved([selectMenuRef.current.getSize(), mainRef.current.getSize()]);
      sidebarRef.current?.resize(100);
      selectMenuRef.current.resize(0);
      mainRef.current.resize(0);
    } else {
      sidebarRef.current?.resize(100 - saved[0] - saved[1]);
      selectMenuRef.current.resize(saved[0]);
      mainRef.current.resize(saved[1]);
    }
  }, [selectMenuRef.current, mainRef.current, tab, fullWidthTabs, saved]);

  return {sidebarRef, mainRef, selectMenuRef};
}
