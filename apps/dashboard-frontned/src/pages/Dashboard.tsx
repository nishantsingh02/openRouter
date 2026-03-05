import { useQuery } from "@tanstack/react-query";
import { useElysiaClient } from "../providers/Eden";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import {
    Key,
    Coins,
    Activity,
    Plus,
    ArrowRight,
    Loader2,
    Layers,
} from "lucide-react";

export function Dashboard() {
    const elysiaClient = useElysiaClient();

    const apiKeysQuery = useQuery({
        queryKey: ["api-keys"],
        queryFn: async () => {
            const response = await elysiaClient["api-keys"].get();
            if (response.error) throw new Error("Failed to fetch API keys");
            return response.data;
        },
    });

    const modelsQuery = useQuery({
        queryKey: ["models"],
        queryFn: async () => {
            const response = await elysiaClient.models.get();
            if (response.error) throw new Error("Failed to fetch models");
            return response.data;
        },
    });

    const apiKeys = apiKeysQuery.data?.apiKeys ?? [];
    const activeKeys = apiKeys.filter((k) => !k.disable);
    const totalCreditsUsed = apiKeys.reduce(
        (sum, k) => sum + (k.creditConsumed ?? 0),
        0
    );
    const modelCount = modelsQuery.data?.models?.length ?? 0;
    const isLoading = apiKeysQuery.isLoading;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Overview of your OpenRouter account.
                    </p>
                </div>

                {/* Stats */}
                {isLoading ? (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
                        <Loader2 className="size-4 animate-spin" />
                        Loading...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="bg-card/50 border-border/50">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Active API Keys</span>
                                    <Key className="size-4 text-muted-foreground/60" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold tracking-tight">
                                    {activeKeys.length}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {apiKeys.length} total
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-border/50">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Credits Used</span>
                                    <Coins className="size-4 text-muted-foreground/60" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold tracking-tight">
                                    {totalCreditsUsed.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    across all keys
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-border/50">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Available Models</span>
                                    <Layers className="size-4 text-muted-foreground/60" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold tracking-tight">
                                    {modelCount}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    from all providers
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Quick actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="bg-card/30 border-border/40 hover:border-border/70 transition-colors">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="size-10 rounded-lg bg-primary/5 border border-border/50 flex items-center justify-center mb-3">
                                        <Plus className="size-5 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Create API Key</h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Generate a new key to start making requests.
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/api-keys">
                                        Go
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/30 border-border/40 hover:border-border/70 transition-colors">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="size-10 rounded-lg bg-primary/5 border border-border/50 flex items-center justify-center mb-3">
                                        <Coins className="size-5 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-semibold text-sm">Add Credits</h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Top up your balance to keep making requests.
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                    <Link to="/credits">
                                        Go
                                        <ArrowRight className="size-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent API keys */}
                {apiKeys.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold">Your API Keys</h2>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/api-keys" className="text-xs">
                                    View all
                                    <ArrowRight className="size-3" />
                                </Link>
                            </Button>
                        </div>
                        <div className="rounded-xl border border-border/50 bg-card/30 overflow-x-auto">
                            <table className="w-full text-sm min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-border/50">
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Name</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Key</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                                        <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Credits Used</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiKeys.slice(0, 5).map((key) => (
                                        <tr key={key.id} className="border-b border-border/30 last:border-0">
                                            <td className="px-4 py-3 font-medium">{key.name}</td>
                                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                                                {key.apiKey.slice(0, 12)}...{key.apiKey.slice(-4)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${key.disable
                                                            ? "text-muted-foreground"
                                                            : "text-emerald-400"
                                                        }`}
                                                >
                                                    <span
                                                        className={`size-1.5 rounded-full ${key.disable ? "bg-muted-foreground" : "bg-emerald-400"
                                                            }`}
                                                    />
                                                    {key.disable ? "Disabled" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right tabular-nums">
                                                {(key.creditConsumed ?? 0).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}