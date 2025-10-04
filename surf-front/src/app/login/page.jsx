import LoginForm from "./LoginForm";
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-center my-20">Log in</h1>
        <LoginForm />
        <p className="text-4xl text-center mt-10 p-2">
          Haven't got an account yet?
        </p>
        <p className="text-4xl text-center">
          Create your account<br></br>and start discovering the best surf spots
          in the world 🌍
        </p>
        {/* Bouton */}
        <ButtonLink
          href="signup"
          className="mt-4 mb-8 text-md px-3 py-1 rounded bg-blue-900 text-white"
        >
          🏄‍♂️ Create an account
        </ButtonLink>
      </div>
    </>
  );
}
