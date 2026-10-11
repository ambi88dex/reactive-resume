import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "./-components/app-shell";
import { requireSession } from "@/libs/auth/require-session";
import { createNoindexFollowMeta } from "@/libs/seo";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: ({ context, location }) => requireSession(context, location),
	head: () => ({
		meta: [createNoindexFollowMeta()],
	}),
});

function RouteComponent() {
	return (
		<AppShell>
			<Outlet />
		</AppShell>
	);
}
