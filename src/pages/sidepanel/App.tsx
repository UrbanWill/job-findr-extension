import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SidePanel from './SidePanel';
import SidePanelLayout from '../../components/ui/side-panel-layout.tsx';
import { AuthContextProvider } from '@/providers/auth-provider';
import { isDev } from '@root/utils/constants';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SidePanelLayout>
          <SidePanel />
        </SidePanelLayout>
        {isDev && <ReactQueryDevtools />}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
