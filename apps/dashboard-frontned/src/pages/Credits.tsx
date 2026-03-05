import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useElysiaClient } from "../providers/Eden";
import { DashboardLayout } from "../components/DashboardLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
    Coins,
    Plus,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Wallet,
    TrendingUp,
} from "lucide-react";

export function Credits() {
    const elysiaClient = useElysiaClient();
    const queryClient = useQueryClient();

    const apiKeysQuery = useQuery({
        queryKey: ["api-keys"],
        queryFn: async () => {
            const response = await elysiaClient["api-keys"].get();
            if (response.error) throw new Error("Failed to fetch API keys");
            return response.data;
        },
    });

    const userProfileQuery = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const response = await elysiaClient["auth"].profile.get();
            if (response.error) throw new Error("Error while fetching user details")
            return response.data;
        }
    })

    const onrampMutation = useMutation({
        mutationFn: async () => {
            const response = await elysiaClient.payments.onramp.post();
            if (response.error) {
                const errValue = response.error.value as { message?: string } | undefined;
                throw new Error(errValue?.message || "Failed to add credits");
            }
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-keys"] });
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });

    const apiKeys = apiKeysQuery.data?.apiKeys ?? [];
    const totalCreditsUsed = apiKeys.reduce(
        (sum, k) => sum + (k.creditConsumed ?? 0),
        0
    );
    const credits = userProfileQuery.data?.credits;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Credits</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Manage your account balance and add credits.
                    </p>
                </div>

                {/* Balance & usage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {onrampMutation.isSuccess && onrampMutation.data && (
                        <Card className="sm:col-span-2 bg-card/50 border-emerald-500/20">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <Wallet className="size-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-emerald-400">Current Balance</p>
                                        <p className="text-3xl font-bold tracking-tight">
                                            {onrampMutation.data.credits?.toLocaleString() ?? "—"} credits
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="bg-card/50 border-border/50">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Credits available</span>
                                <TrendingUp className="size-4 text-muted-foreground/60" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold tracking-tight">
                                {userProfileQuery.isLoading ? (
                                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                                ) : (
                                    credits
                                )}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                across {apiKeys.length} API key{apiKeys.length !== 1 ? "s" : ""}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 border-border/50">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Per-Key Breakdown</span>
                                <Coins className="size-4 text-muted-foreground/60" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {apiKeysQuery.isLoading ? (
                                <Loader2 className="size-5 animate-spin text-muted-foreground" />
                            ) : apiKeys.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No API keys yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {apiKeys.slice(0, 4).map((key) => (
                                        <div key={key.id} className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground truncate mr-4">{key.name}</span>
                                            <span className="tabular-nums font-medium">
                                                {(key.creditConsumed ?? 0).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                    {apiKeys.length > 4 && (
                                        <p className="text-xs text-muted-foreground">
                                            +{apiKeys.length - 4} more
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Add credits */}
                <Card className="bg-card/30 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Add Credits</CardTitle>
                        <CardDescription>
                            Top up your account with 1,000 credits per transaction.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-4 py-3 flex-1">
                                <Coins className="size-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm font-medium">1,000 Credits</p>
                                    <p className="text-xs text-muted-foreground">Standard top-up</p>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="h-12 px-6"
                                onClick={() => onrampMutation.mutate()}
                                disabled={onrampMutation.isPending}
                            >
                                {onrampMutation.isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="size-4" />
                                        Add credits
                                    </>
                                )}
                            </Button>
                        </div>

                        {onrampMutation.isSuccess && (
                            <div className="flex items-start gap-2.5 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3.5 py-3 mt-4">
                                <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                                <span>
                                    1,000 credits added successfully! Your new balance: {onrampMutation.data?.credits?.toLocaleString() ?? "—"} credits.
                                </span>
                            </div>
                        )}

                        {onrampMutation.isError && (
                            <div className="flex items-start gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-3 mt-4">
                                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                                <span>
                                    {onrampMutation.error?.message || "Failed to add credits. Please try again."}
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}