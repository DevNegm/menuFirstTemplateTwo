import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Error from "../pages/main/Error.jsx"; 
import MainLayout from "../components/layouts/MainLayout.jsx";
import errorImage from '../assets/error.jpg'
const lazyRetry = function (componentImport) {
    return new Promise((resolve, reject) => {
        componentImport()
            .then((component) => {
                resolve(component);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            });
    });
};

const Loading = (
    <div
        style={{
            position:'fixed',
            left:0  ,
            top:0,
            zIndex:999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
        }}
    >
        <CircularProgress size={'1.5rem'} style={{color:'#B57EDC'}} />
    </div>
);
const ErrorFallback = (
    <div
        style={{
            position:'fixed',
            left:0  ,
            top:0,
            zIndex:999,
            display: "flex",
            flexDirection: "column",
            gap:'1rem',
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor:'#fff'
        }}
    >   
     <div className='errorContainer'>
        <img src={errorImage} alt="Sorry, The page not found" />
            <h4>عفوا حدث خطأ ما</h4>
            <p>نعمل على اصلاح هذة المشكلة في اسرع وقت</p>
        </div>
    </div>
);




// main pages
const Home = lazy(() =>
    lazyRetry(() => import("../pages/main/Home"))
)






const router = createBrowserRouter([
   
    {
        path: "",
        errorElement: ErrorFallback,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={Loading}>
                        <Home />
                    </Suspense>
                )
            },
          
           
            {
                path:"*",
                element: (
                    <Suspense fallback={Loading}>
                        <Error />
                    </Suspense>
                )
            }
          
        ]
    },
])

export default router