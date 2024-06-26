"use client";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function HomePage() {
  const { isAuthenticated } = useConvexAuth();

  const addUser = useMutation(api.users.create);
  const router = useRouter();

  useEffect(() => {
    const createUser = async () => {
      if (isAuthenticated) {
        try {
          await addUser();
        } catch (error) {
          throw Error(error as string);
        }
      }
    };

    createUser();
  }, [isAuthenticated, addUser, router]);
  return (
    <div className="flex h-full w-full justify-center items-center text-white font-mono">
      <div className="flex">Welcome to Vortex!</div>
    </div>
  );
}

export default HomePage;
