import React from "react";
import { SignIn } from "@clerk/clerk-react";

const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
