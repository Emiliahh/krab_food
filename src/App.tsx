import { RouterProvider } from "react-router";
import { routes } from "./routes/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ToastContainer autoClose={1500} newestOnTop={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
