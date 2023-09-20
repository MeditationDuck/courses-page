import SignInForm from "@/app/components/SignInForm";

const SignInPage = () => {
  return ( 
    <div className="h-full items-center flex justify-center flex-col gap-4 p-2">
      <h1 className="text-3xl">
        Sign In
      </h1>
      <SignInForm />
    </div>

   );
}
 
export default SignInPage;