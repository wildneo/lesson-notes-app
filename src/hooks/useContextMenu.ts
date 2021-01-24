import { createContext, useContext, Context } from 'react';

import { Nullable } from '../typings';

export type AnchorEl = Nullable<HTMLElement>;

export interface ContextMenuMethods<S = unknown> {
  index: number;
  state: S | null;
  anchorEl: AnchorEl;
  openMenu: (anchorEl: AnchorEl, payload?: S) => void;
  closeMenu: () => void;
  setIndex: (index: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MenuContext = createContext<ContextMenuMethods | null>(null);

export default <S>() =>
  useContext(MenuContext as Context<ContextMenuMethods<S>>);
