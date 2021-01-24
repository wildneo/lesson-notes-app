import React from 'react';

import {
  AnchorEl,
  MenuContext,
  ContextMenuMethods,
} from '../hooks/useContextMenu';

const CotextMenuProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [anchorEl, setAnchorEl] = React.useState<AnchorEl>(null);
  const [index, setIndex] = React.useState<number>(-1);
  const [state, setState] = React.useState<unknown>(null);

  const openMenu: ContextMenuMethods['openMenu'] = (anchor, payload?) => {
    if (payload) {
      setState(payload);
    }
    setAnchorEl(anchor);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setState(null);
  };

  return (
    <MenuContext.Provider
      value={{
        index,
        state,
        anchorEl,
        openMenu,
        closeMenu,
        setIndex,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default React.memo(CotextMenuProvider);
