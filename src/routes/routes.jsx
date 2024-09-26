import Layout from "../components/Layout/Layout";
import Index from "../pages/IndexPage/Index";
import FileUpload from "../pages/FileUploadPage/FileUpload";
import TableDisplay from "../pages/TablePage/TableDisplay";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <Index />
                ),
            },
        ],
    },
    {
        path: "/file-upload",
        element: <FileUpload />,
    },
    {
        path: "/tables",
        element: <TableDisplay />
    },
]);

export default router;