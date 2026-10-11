import { createFileRoute } from "@tanstack/react-router";
import { requireSession } from "@/libs/auth/require-session";

// The Agents pages became the assistant in the editor; their links redirect there (through 6.0.x).
export const Route = createFileRoute("/agent")({
	beforeLoad: ({ context, location }) => requireSession(context, location),
});
