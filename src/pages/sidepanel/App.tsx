import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SidePanel from './SidePanel';
import SidePanelLayout from '../../components/ui/side-panel-layout.tsx';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidePanelLayout>
        <SidePanel />
      </SidePanelLayout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
