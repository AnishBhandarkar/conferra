import LoginForm from "../components/auth/LoginForm";
import Link from "next/link";
import LoginPageToast from "../components/auth/LoginPageToast";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center py-24 px-4">

            <div className="w-full max-w-md bg-background border border-foreground/10 rounded-xl shadow-sm p-8 space-y-6">

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome Back
                    </h1>

                    <p className="text-sm text-foreground/60">
                        Login to continue exploring tech events
                    </p>
                </div>

                <LoginForm />
                <LoginPageToast />

                <p className="text-sm text-center text-foreground/60">
                    Dont have an account?{" "}
                    <Link href="/signup" className="font-medium hover:underline">
                        Sign up
                    </Link>
                </p>

            </div>

        </div>
    );
}