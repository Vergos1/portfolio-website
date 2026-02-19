import { AppHeader, AppMain } from '@components-layout';
import { FullPageProvider } from '@components-providers';
import { Cursor } from '@components-ui';
import '@styles/_index.scss';

export default async function HomePage() {
  return (
    <>
      <Cursor />
      <AppHeader />
      <FullPageProvider>
        <AppMain />
      </FullPageProvider>
    </>
  );
}
