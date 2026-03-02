import { useRef, useState } from "react";
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
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Plus,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Copy,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Key,
    Eye,
    EyeOff,
} from "lucide-react";

export function ApiKeys() {
    const elysiaClient = useElysiaClient();
    const queryClient = useQueryClient();
    const nameRef = useRef<HTMLInputElement>(null);
    const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

    const apiKeysQuery = useQuery({
        queryKey: ["api-keys"],
        queryFn: async () => {
            const response = await elysiaClient["api-keys"].get();
            if (response.error) throw new Error("Failed to fetch API keys");
            return response.data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (name: string) => {
            const response = await elysiaClient["api-keys"].post({ name });
            if (response.error) {
                const errValue = response.error.value as { message?: string } | undefined;
                throw new Error(errValue?.message || "Failed to create API key");
            }
            return response.data;
        },
        onSuccess: (data) => {
            setNewlyCreatedKey(data?.apiKey ?? null);
            if (nameRef.current) nameRef.current.value = "";
            queryClient.invalidateQueries({ queryKey: ["api-keys"] });
        },
    });

    const toggleMutation = useMutation({
        mutationFn: async ({ id, disabled }: { id: string; disabled: boolean }) => {
            const response = await elysiaClient["api-keys"].put({ id, disabled });
            if (response.error) {
                const errValue = response.error.value as { message?: string } | undefined;
                throw new Error(errValue?.message || "Failed to update API key");
            }
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-keys"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await elysiaClient["api-keys"]({ id }).delete();
            if (response.error) {
                const errValue = response.error.value as { message?: string } | undefined;
                throw new Error(errValue?.message || "Failed to delete API key");
            }
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["api-keys"] });
        },
    });

    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleReveal = (id: string) => {
        setRevealedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const apiKeys = apiKeysQuery.data?.apiKeys ?? [];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Create and manage your API keys for accessing models.
                    </p>
                </div>

                {/* Create new key */}
                <Card className="bg-card/30 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Create new key</CardTitle>
                        <CardDescription>
                            Give your key a descriptive name to identify it later.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="flex flex-col sm:flex-row gap-3"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const name = nameRef.current?.value?.trim();
                                if (name) createMutation.mutate(name);
                            }}
                        >
                            <div className="flex-1">
                                <Label htmlFor="key-name" className="sr-only">Key name</Label>
                                <Input
                                    id="key-name"
                                    ref={nameRef}
                                    placeholder="e.g. Production, Development, My App"
                                    className="h-10"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="h-10"
                                disabled={createMutation.isPending}
                            >
                                {createMutation.isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="size-4" />
                                        Create key
                                    </>
                                )}
                            </Button>
                        </form>

                        {newlyCreatedKey && (
                            <div className="flex items-start gap-2.5 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3.5 py-3 mt-4">
                                <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                                <div className="min-w-0 flex-1">
                                    <p>Key created! Copy it now — you won't be able to see the full key again.</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <code className="text-xs bg-emerald-500/10 rounded px-2 py-1 font-mono truncate block">
                                            {newlyCreatedKey}
                                        </code>
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={() => copyToClipboard(newlyCreatedKey, "new")}
                                        >
                                            {copiedId === "new" ? (
                                                <CheckCircle2 className="size-3.5" />
                                            ) : (
                                                <Copy className="size-3.5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {createMutation.isError && (
                            <div className="flex items-start gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-3 mt-4">
                                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                                <span>{createMutation.error?.message || "Failed to create key."}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Keys list */}
                <div>
                    <h2 className="text-sm font-semibold mb-4">
                        Your keys
                        {!apiKeysQuery.isLoading && (
                            <span className="text-muted-foreground font-normal ml-2">
                                ({apiKeys.length})
                            </span>
                        )}
                    </h2>

                    {apiKeysQuery.isLoading ? (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm py-8">
                            <Loader2 className="size-4 animate-spin" />
                            Loading keys...
                        </div>
                    ) : apiKeys.length === 0 ? (
                        <Card className="bg-card/20 border-border/40 border-dashed">
                            <CardContent className="pt-6">
                                <div className="text-center py-8">
                                    <Key className="size-10 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">No API keys yet</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">
                                        Create your first key above to get started.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="rounded-xl border border-border/50 bg-card/30 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/50">
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Name</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Key</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                                        <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Credits Used</th>
                                        <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiKeys.map((key) => (
                                        <tr key={key.id} className="border-b border-border/30 last:border-0 group">
                                            <td className="px-4 py-3 font-medium">{key.name}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <code className="font-mono text-xs text-muted-foreground">
                                                        {revealedKeys.has(key.id)
                                                            ? key.apiKey
                                                            : `${key.apiKey.slice(0, 12)}${"•".repeat(8)}`}
                                                    </code>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => toggleReveal(key.id)}
                                                    >
                                                        {revealedKeys.has(key.id) ? (
                                                            <EyeOff className="size-3" />
                                                        ) : (
                                                            <Eye className="size-3" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => copyToClipboard(key.apiKey, key.id)}
                                                    >
                                                        {copiedId === key.id ? (
                                                            <CheckCircle2 className="size-3 text-emerald-400" />
                                                        ) : (
                                                            <Copy className="size-3" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                                        key.disabled
                                                            ? "text-muted-foreground"
                                                            : "text-emerald-400"
                                                    }`}
                                                >
                                                    <span
                                                        className={`size-1.5 rounded-full ${
                                                            key.disabled ? "bg-muted-foreground" : "bg-emerald-400"
                                                        }`}
                                                    />
                                                    {key.disabled ? "Disabled" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right tabular-nums">
                                                {(key.credisConsumed ?? 0).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() =>
                                                            toggleMutation.mutate({
                                                                id: key.id,
                                                                disabled: !key.disabled,
                                                            })
                                                        }
                                                        disabled={toggleMutation.isPending}
                                                        title={key.disabled ? "Enable key" : "Disable key"}
                                                    >
                                                        {key.disabled ? (
                                                            <ToggleLeft className="size-4 text-muted-foreground" />
                                                        ) : (
                                                            <ToggleRight className="size-4 text-emerald-400" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => deleteMutation.mutate(key.id)}
                                                        disabled={deleteMutation.isPending}
                                                        title="Delete key"
                                                    >
                                                        <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {(toggleMutation.isError || deleteMutation.isError) && (
                        <div className="flex items-start gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-3 mt-4">
                            <AlertCircle className="size-4 shrink-0 mt-0.5" />
                            <span>
                                {toggleMutation.error?.message ||
                                    deleteMutation.error?.message ||
                                    "Operation failed. Please try again."}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}