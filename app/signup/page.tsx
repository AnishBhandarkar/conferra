import SignupForm from "../components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center py-24 px-4">

            <div className="w-full max-w-md bg-background border border-foreground/10 rounded-xl shadow-sm p-8 space-y-6">

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create Account
                    </h1>

                    <p className="text-sm text-foreground/60">
                        Join Conferra and start discovering tech events
                    </p>
                </div>

                <SignupForm />

                <p className="text-sm text-center text-foreground/60">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium hover:underline">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}