import { RouterProvider } from "react-router";
import { routes } from "./routes/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        {/* react query dev tool */}
        <ReactQueryDevtools initialIsOpen={false} />  
      </QueryClientProvider>
    </>
  );
}

export default App;
