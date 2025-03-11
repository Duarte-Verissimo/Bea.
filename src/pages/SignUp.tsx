import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;
