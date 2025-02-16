"use client";

import { AuthFormHeader, LoginForm } from "@/components/forms/auth";
import OAuthButtons from "@/components/shared/OAuthButtons";
import { useRedirectIfAuthenticated } from "@/hooks";
import buildingImage from "@/../public/assets/images/photo18.webp";
import Image from "next/image";

export default function LoginPage() {
  useRedirectIfAuthenticated();
  return (
    <>
      <div className="relative h-screen overflow-hidden opacity-80">
        <div className="absolute inset-0 z-0">
          <Image
            src={buildingImage}
            alt="Apartments"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        </div>

        <div className="relative ">
          <AuthFormHeader
            title="Login to your account"
            staticText="Don't have an account?"
            linkText="Register Here"
            linkHref="/register"
          />
          <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="rounded-xl bg-zinc-50/30 px-6 py-12 shadow dark:bg-deepBlueGrey/70 sm:rounded-lg sm:px-12 md:rounded-3xl">
              <LoginForm />

              <div className="flex-center mt-5 space-x-2">
                <div className="h-px flex-1 bg-richBlack dark:bg-platinum"></div>
                <span className="dark: px-2 text-sm text-platinum">Or</span>
                <div className="h-px flex-1 bg-richBlack dark:bg-platinum"></div>
              </div>
              <OAuthButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
