import SignInForm from "@/components/SignInForm";
const SignInPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 p-2">
      <h1 className="text-3xl">
        Welcome Back
      </h1>
      <h2 className="text-muted-foreground">
        Sign in your account
      </h2>
      <SignInForm />
    </div>
   );
}
 
export default SignInPage;