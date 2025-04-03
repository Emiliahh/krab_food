import { RouterProvider } from "react-router";
import { routes } from "./routes/route";

function App() {
  return (
    <>
    <RouterProvider router={routes}/>
    </>
  );
}

export default App;
