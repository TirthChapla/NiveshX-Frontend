import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  AvatarIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate=()=>{
    if(auth.user){
      auth.user.role==="ROLE_ADMIN"?navigate("/admin/withdrawal"):navigate("/profile")
    }
  }
  return (
    <>
      <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Sheet className="">
            <SheetTrigger>
              <Button
                className="rounded-full h-11 w-11"
                variant="ghost"
                size="icon"
              >
                <DragHandleHorizontalIcon className=" h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-72  border-r-0 flexs flex-col  justify-center"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>
                  <div className="text-3xl flex justify-center  items-center gap-1">
                    <Avatar className="h-10 w-32">
                      <AvatarImage src="/NiveshX_logo.png" alt="Logo"/>
                    </Avatar>

                  </div>
                </SheetTitle>
              </SheetHeader>
              <SideBar />
            </SheetContent>
          </Sheet>

          <div
  onClick={() => navigate("/")}
  className="cursor-pointer rounded-lg transition-all duration-200 flex items-center"
>
  <img
    src="NiveshX_logo.png"
    alt="NiveshX Logo"
    className="h-12 w-32 object-contain rounded-full"
  />
</div>

          <div className="p-0 ml-9">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="flex items-center gap-3"
            >
              {" "}
              <MagnifyingGlassIcon className="left-2 top-3 " />
              <span>Search</span>
            </Button>
          </div>
        </div>
        <div>
          <Avatar className="cursor-pointer " onClick={handleNavigate}>
            {!auth.user ? (
              <AvatarIcon className=" h-8 w-8 " />
            ) : (
              <AvatarFallback className="bg-orange-500  text-white text-xl font-semibold  hover:bg-blue-500 ">{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;








// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   AvatarIcon,
//   DragHandleHorizontalIcon,
//   MagnifyingGlassIcon,
// } from "@radix-ui/react-icons";
// import SideBar from "../SideBar/SideBar";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useState } from "react";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { auth } = useSelector((store) => store);

//   const handleNavigate=()=>{
//     if(auth.user){
//       auth.user.role==="ROLE_ADMIN"?navigate("/admin/withdrawal"):navigate("/profile")
//     }
//   }
//   return (
//     <>
//       <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <Sheet className="">
//             <SheetTrigger>
//               <Button
//                 className="rounded-full h-11 w-11"
//                 variant="ghost"
//                 size="icon"
//               >
//                 <DragHandleHorizontalIcon className=" h-7 w-7" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent
//               className="w-72  border-r-0 flexs flex-col  justify-center"
//               side="left"
//             >
//               <SheetHeader>
//                 <SheetTitle>
//                   <div className="text-3xl flex justify-center  items-center gap-1">
//                     <Avatar className="h-10 w-10">
//                       <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
//                     </Avatar>
//                     <div>
//                       <span className="font-bold m-3 text-orange-700">NiveshX</span>
                      
//                     </div>
//                   </div>
//                 </SheetTitle>
//               </SheetHeader>
//               <SideBar />
//             </SheetContent>
//           </Sheet>

//           <div
//   onClick={() => navigate("/")}
//   className="cursor-pointer p-2 rounded transition hover:bg-primary hover:ring-2 hover:ring-primary"
// >
//   <img
//     src="NiveshX_logo.png" height={50} width={150}
//     alt="Logo"
//     className="h-12 w-12 lg:h-14 lg:w-20 object-contain rounded-full"
//   />
// </div>

//           <div className="p-0 ml-9">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/search")}
//               className="flex items-center gap-3"
//             >
//               {" "}
//               <MagnifyingGlassIcon className="left-2 top-3 " />
//               <span>Search</span>
//             </Button>
//           </div>
//         </div>
//         <div>
//           <Avatar className="cursor-pointer" onClick={handleNavigate}>
//             {!auth.user ? (
//               <AvatarIcon className=" h-8 w-8" />
//             ) : (
//               <AvatarFallback>{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
//             )}
//           </Avatar>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
