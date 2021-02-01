import React from 'react';

import {
  AnchorEl,
  MenuContext,
  ContextMenuMethods,
} from '../hooks/useContextMenu';

const CotextMenuProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [anchorEl, setAnchorEl] = React.useState<AnchorEl>(null);
  const [state, setState] = React.useState<unknown>(null);

  const openMenu: ContextMenuMethods['openMenu'] = (anchor, payload) => {
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
        state,
        anchorEl,
        openMenu,
        closeMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default React.memo(CotextMenuProvider);
