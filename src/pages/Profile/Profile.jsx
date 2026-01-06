import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import AccountVarificationForm from "./AccountVarificationForm";
import { VerifiedIcon } from "lucide-react";
import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp);
    dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }));
  };

  const handleVerifyOtp = (otp) => {
    console.log("otp  - ", otp);
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
  };

  return (
    // Outer container with dark background and padding
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-10"> {/* Increased max-width and space */}

        {/* User Information Card */}
        <Card className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
          <CardHeader className="pb-6 border-b border-gray-800">
            <CardTitle className="text-3xl font-bold text-blue-400">Your Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6"> {/* Increased gaps */}
              <div className="space-y-5"> {/* Increased space */}
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Email:</p> {/* Stronger label */}
                  <p className="text-gray-400">{auth.user?.email}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Full Name:</p>
                  <p className="text-gray-400">{"Code with Zosh"}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Date Of Birth:</p>
                  <p className="text-gray-400">{"25/09/2000"}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Nationality:</p>
                  <p className="text-gray-400">{"Indian"}</p>
                </div>
              </div>
              <div className="space-y-5"> {/* Increased space */}
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Address:</p>
                  <p className="text-gray-400">{"Code with Zosh"}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">City:</p>
                  <p className="text-gray-400">{"Mumbai"}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Postcode:</p>
                  <p className="text-gray-400">{345020}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-36 font-semibold text-gray-300">Country:</p>
                  <p className="text-gray-400">{"India"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2 Step Verification Card */}
        <Card className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
          <CardHeader className="pb-6 border-b border-gray-800">
            <div className="flex items-center gap-4"> {/* Increased gap */}
              <CardTitle className="text-3xl font-bold text-blue-400">2-Step Verification</CardTitle>
              {auth.user.twoFactorAuth?.enabled ? (
                <Badge className="space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-base font-medium transition-colors duration-200 flex items-center"> {/* Larger, more prominent badge */}
                  <VerifiedIcon className="w-5 h-5" /> <span>Enabled</span>
                </Badge>
              ) : (
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full text-base font-medium transition-colors duration-200">
                  Disabled
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="px-8 py-3 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-lg"> {/* More prominent button */}
                  Enable Two-Step Verification
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-700 text-gray-100 p-6 rounded-lg"> {/* Darker dialog */}
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center text-blue-400 pb-4">
                    Verify Your Account
                  </DialogTitle>
                </DialogHeader>
                <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Security and Account Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Change Password Card */}
          <Card className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
            <CardHeader className="pb-6 border-b border-gray-800">
              <CardTitle className="text-3xl font-bold text-blue-400">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-5"> {/* Increased space */}
              <div className="flex items-center">
                <p className="w-36 font-semibold text-gray-300">Email:</p>
                <p className="text-gray-400">{auth.user.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-36 font-semibold text-gray-300">Password:</p>
                <Button variant="secondary" className="px-8 py-3 rounded-md font-semibold text-black-800 bg-red-600 hover:bg-gray-600 transition-colors duration-200 text-lg">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Status Card */}
          <Card className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
            <CardHeader className="pb-6 border-b border-gray-800">
              <div className="flex items-center gap-4"> {/* Increased gap */}
                <CardTitle className="text-3xl font-bold text-blue-00">Account Status</CardTitle>
                {auth.user.verified ? (
                  <Badge className="space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-base font-medium transition-colors duration-200 flex items-center">
                    <VerifiedIcon className="w-5 h-5" /> <span>Verified</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-full text-base font-medium transition-colors duration-200">
                    Pending
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-5"> {/* Increased space */}
              <div className="flex items-center">
                <p className="w-36 font-semibold text-gray-300">Email:</p>
                <p className="text-gray-400">{auth.user.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-36 font-semibold text-gray-300">Mobile:</p>
                <p className="text-gray-400">+918987667899</p>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="px-8 py-3 rounded-md font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-lg">
                      Verify Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-gray-900 border border-gray-700 text-gray-100 p-6 rounded-lg"> {/* Darker dialog */}
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-center text-blue-400 pb-4">
                        Verify Your Account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleVerifyOtp} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;






// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useDispatch, useSelector } from "react-redux";
// import AccountVarificationForm from "./AccountVarificationForm";
// import { VerifiedIcon } from "lucide-react";
// import { enableTwoStepAuthentication, verifyOtp } from "@/Redux/Auth/Action";

// const Profile = () => {
//   const { auth } = useSelector((store) => store);
//   const dispatch = useDispatch();

//   const handleEnableTwoStepVerification =(otp)=>{
//     console.log("EnableTwoStepVerification",otp)
//     dispatch(enableTwoStepAuthentication({jwt:localStorage.getItem("jwt"),otp}))
//   }

//   const handleVerifyOtp=(otp)=>{
//     console.log("otp  - ",otp)
//     dispatch(verifyOtp({jwt:localStorage.getItem("jwt"),otp}))
//   }
//   return (
//     <div className="flex flex-col items-center mb-5">
//       <div className="pt-10 w-full lg:w-[60%]">
//         <Card>
//           <CardHeader className="pb-9">
//             <CardTitle>Your Information</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="lg:flex gap-32">
//               <div className="space-y-7">
//                 <div className="flex">
//                   <p className="w-[9rem]">Email : </p>
//                   <p className="text-gray-500">{auth.user?.email} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">Full Name : </p>
//                   <p className="text-gray-500">{"code with zosh"} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">Date Of Birth : </p>
//                   <p className="text-gray-500">{"25/09/2000"} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">Nationality : </p>
//                   <p className="text-gray-500">{"indian"} </p>
//                 </div>
//               </div>
//               <div className="space-y-7">
//                 <div className="flex">
//                   <p className="w-[9rem]">Address : </p>
//                   <p className="text-gray-500">{"code with zosh"} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">City : </p>
//                   <p className="text-gray-500">{"mumbai"} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">Postcode : </p>
//                   <p className="text-gray-500">{345020} </p>
//                 </div>
//                 <div className="flex">
//                   <p className="w-[9rem]">Country : </p>
//                   <p className="text-gray-500">{"india"} </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <div className="mt-6">
//         <Card className="w-full">
//             <CardHeader className="pb-7">
//               <div className="flex items-center gap-3">
//                 <CardTitle>2 Step Verification</CardTitle>

//                 {auth.user.twoFactorAuth?.enabled ? (
//                   <Badge className="space-x-2 text-white bg-green-600">
//                     <VerifiedIcon /> <span>{"Enabled"}</span>
//                   </Badge>
//                 ) : (
//                   <Badge className="bg-orange-500">Disabled</Badge>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-5">
              
//               <div>
//                 <Dialog>
//                   <DialogTrigger>
//                     <Button>Enabled Two Step Verification</Button>
//                   </DialogTrigger>
//                   <DialogContent className="">
//                     <DialogHeader className="">
//                       <DialogTitle className="px-10 pt-5 text-center">
//                         verify your account
//                       </DialogTitle>
//                     </DialogHeader>
//                     <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="lg:flex gap-5 mt-5">
//           <Card className="w-full">
//             <CardHeader className="pb-7">
//               <CardTitle>Change Password</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5 ">
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Email :</p>
//                 <p>{auth.user.email}</p>
//               </div>
//               {/* <div className="flex items-center">
//                 <p className="w-[8rem]">Mobile :</p>
//                 <p>+918987667899</p>
//               </div> */}
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Password :</p>
//                 <Button variant="secondary">Change Password</Button>
//               </div>
//             </CardContent>
//           </Card>
//           {/* <Card className="w-full">
//             <CardHeader>
//               <CardTitle>Close Account</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5 ">
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Customer Id :</p>
//                 <p>#53DKJ736</p>
//               </div>
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Account :</p>
//                 <Button variant="secondary">Close Account</Button>
//               </div>
//             </CardContent>
//           </Card> */}
//           <Card className="w-full">
//             <CardHeader className="pb-7">
//               <div className="flex items-center gap-3">
//                 <CardTitle>Account Status</CardTitle>

//                 {auth.user.verified ? (
//                   <Badge className="space-x-2 text-white bg-green-600">
//                     <VerifiedIcon /> <span>verified</span>
//                   </Badge>
//                 ) : (
//                   <Badge className="bg-orange-500">pending</Badge>
//                 )}
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Email :</p>
//                 <p>{auth.user.email}</p>
//               </div>
//               <div className="flex items-center">
//                 <p className="w-[8rem]">Mobile :</p>
//                 <p>+918987667899</p>
//               </div>
//               <div>
//                 <Dialog>
//                   <DialogTrigger>
//                     <Button>Verify Account</Button>
                    
//                   </DialogTrigger>
//                   <DialogContent className="">
//                     <DialogHeader className="">
//                       <DialogTitle className="px-10 pt-5 text-center">
//                         verify your account
//                       </DialogTitle>
//                     </DialogHeader>
//                     <AccountVarificationForm handleSubmit={handleVerifyOtp}/>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
