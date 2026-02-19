'use client';
import { AppStore, makeStore } from '@shared-store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export const StoreProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const storeRef = useRef<AppStore | undefined>(undefined);
  storeRef.current ??= makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
};
