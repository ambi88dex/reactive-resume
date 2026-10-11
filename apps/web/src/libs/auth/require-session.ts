import type { FeatureFlags } from "@reactive-resume/api/features/flags";
import type { AuthSession } from "@reactive-resume/auth/types";
import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { authClient } from "./client";
import { getSession } from "./session";
import { sessionQueryKey } from "@/libs/root-context";

type AuthContext = {
	session: AuthSession | null;
	flags: Pick<FeatureFlags, "allowGuestLogin" | "autoGuestLogin">;
	queryClient: QueryClient;
};

export async function requireSession(context: AuthContext, location: { href: string }) {
	let session = context.session;

	if (!session && context.flags.autoGuestLogin && context.flags.allowGuestLogin) {
		const { error } = await authClient.signIn.anonymous();
		if (!error) {
			session = await getSession();
			if (session) context.queryClient.setQueryData(sessionQueryKey, session);
		}
	}

	if (!session) throw redirect({ to: "/auth/login", search: { callbackURL: location.href }, replace: true });
	return { session };
}
