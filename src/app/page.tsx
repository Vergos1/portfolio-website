import { AppMain } from '@components-layout';
import { FullPageProvider } from '@components-providers';
import '@styles/index.css';

export default async function HomePage() {
  return (
    <FullPageProvider>
      <AppMain />
    </FullPageProvider>
  );
}
