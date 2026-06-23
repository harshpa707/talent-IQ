import React from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/react";
import toast from "react-hot-toast";

function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <div>
      <header>
        <button
          className="btn btn-secondary"
          onClick={() => toast.success("this is a success toast")}
        >
          click me
        </button>

        {!isSignedIn ? (
          <>
            <SignInButton />
            <SignUpButton />
          </>
        ) : (
          <UserButton />
        )}
      </header>
    </div>
  );
}

export default HomePage;
