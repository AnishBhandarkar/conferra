import { AccessTokenPayload } from "@/types/auth";

export function ProfileHeader({user}: {user: AccessTokenPayload}) {
    return (
        <section>
            <h1 className="text-3xl font-bold">
                Profile
            </h1>

            <div className="mt-4 border rounded-lg p-4">
                <p className="font-medium">{user.email}</p>
            </div>
        </section>
    );
}