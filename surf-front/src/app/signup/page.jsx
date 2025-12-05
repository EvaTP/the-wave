import UserForm from "@/components/UserForm";

export default function SignupPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-bold text-center mt-15 mb-5">
          Create my account
        </h1>
      </div>

      <div className="min-h-screen flex justify-center items-center">
        <UserForm />
      </div>
    </>
  );
}
