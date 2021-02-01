import { createContext, useContext, Context } from 'react';

import { Nullable } from '../typings';

export type AnchorEl = Nullable<HTMLElement>;

export interface ContextMenuMethods<S = unknown> {
  anchorEl: AnchorEl;
  state: S;
  openMenu: (anchorEl: AnchorEl, payload: S) => void;
  closeMenu: () => void;
}

export const MenuContext = createContext<ContextMenuMethods | null>(null);

export default <S>() =>
  useContext(MenuContext as Context<ContextMenuMethods<S>>);
