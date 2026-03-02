import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useElysiaClient } from "../providers/Eden";
import { Button } from "../components/ui/button";
import {
    ArrowRight,
    Zap,
    Globe,
    Shield,
    BarChart3,
    Code2,
    Layers,
} from "lucide-react";

const features = [
    {
        icon: Globe,
        title: "200+ Models",
        description: "Access GPT-4, Claude, Llama, Gemini, and hundreds more through a single endpoint.",
    },
    {
        icon: Layers,
        title: "Unified API",
        description: "One integration, every model. Switch providers without changing your code.",
    },
    {
        icon: BarChart3,
        title: "Usage Analytics",
        description: "Track spending, monitor usage, and optimize costs across all your API keys.",
    },
    {
        icon: Shield,
        title: "Enterprise Ready",
        description: "SOC 2 compliant infrastructure with 99.9% uptime and global edge routing.",
    },
    {
        icon: Code2,
        title: "Developer First",
        description: "OpenAI-compatible API. Drop-in replacement — just change the base URL.",
    },
    {
        icon: Zap,
        title: "Instant Routing",
        description: "Automatic failover and smart routing finds the fastest, cheapest provider.",
    },
];

export function Landing() {
    const elysiaClient = useElysiaClient();

    const modelsQuery = useQuery({
        queryKey: ["models"],
        queryFn: async () => {
            const response = await elysiaClient.models.get();
            if (response.error) return null;
            return response.data;
        },
    });

    const modelCount = modelsQuery.data?.models?.length ?? 200;

    return (
        <div className="dark min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 border border-primary/20">
                            <Zap className="size-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-semibold tracking-tight">
                            OpenRouter
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/signin">Sign in</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link to="/signup">
                                Get started
                                <ArrowRight className="size-3.5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Background effects */}
                <div
                    className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] blur-[150px]"
                    style={{
                        background: "radial-gradient(circle, oklch(0.7 0.15 55) 0%, transparent 70%)",
                        top: "-20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.3]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.06) 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm text-xs font-medium text-muted-foreground mb-8">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {modelCount}+ models available
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto">
                        One API for{" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(135deg, oklch(0.85 0.15 55), oklch(0.7 0.2 330), oklch(0.65 0.25 264))",
                            }}
                        >
                            every AI model
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Route to the best models from OpenAI, Anthropic, Google, Meta, and more.
                        One integration, infinite possibilities.
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-10">
                        <Button size="lg" asChild className="h-12 px-8 text-base">
                            <Link to="/signup">
                                Start building
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
                            <Link to="/dashboard">View dashboard</Link>
                        </Button>
                    </div>

                    {/* Code snippet */}
                    <div className="mt-16 max-w-2xl mx-auto">
                        <div className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden shadow-2xl text-left">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                                <span className="size-3 rounded-full bg-red-500/60" />
                                <span className="size-3 rounded-full bg-yellow-500/60" />
                                <span className="size-3 rounded-full bg-green-500/60" />
                                <span className="ml-2 text-xs text-muted-foreground font-mono">request.ts</span>
                            </div>
                            <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
                                <code>
                                    <span className="text-muted-foreground">{"// Just change the base URL — that's it\n"}</span>
                                    <span className="text-blue-400">{"const "}</span>
                                    <span className="text-foreground">{"response "}</span>
                                    <span className="text-muted-foreground">{"= "}</span>
                                    <span className="text-blue-400">{"await "}</span>
                                    <span className="text-yellow-300">{"fetch"}</span>
                                    <span className="text-foreground">{"(\n"}</span>
                                    <span className="text-emerald-400">{'  "https://openrouter.ai/api/v1/chat"'}</span>
                                    <span className="text-foreground">{",\n  { "}</span>
                                    <span className="text-foreground">{"method: "}</span>
                                    <span className="text-emerald-400">{'"POST"'}</span>
                                    <span className="text-foreground">{",\n    body: JSON."}</span>
                                    <span className="text-yellow-300">{"stringify"}</span>
                                    <span className="text-foreground">{"({\n"}</span>
                                    <span className="text-foreground">{"      model: "}</span>
                                    <span className="text-emerald-400">{'"anthropic/claude-sonnet-4-5"'}</span>
                                    <span className="text-foreground">{",\n      messages: [{ role: "}</span>
                                    <span className="text-emerald-400">{'"user"'}</span>
                                    <span className="text-foreground">{", content: "}</span>
                                    <span className="text-emerald-400">{'"Hello!"'}</span>
                                    <span className="text-foreground">{" }]\n    })\n  }\n)"}</span>
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 border-t border-border/30">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            Everything you need to ship AI
                        </h2>
                        <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                            Built for developers who want to move fast without being locked into a single provider.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-xl border border-border/40 bg-card/30 p-6 hover:border-border/80 hover:bg-card/60 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center size-10 rounded-lg bg-primary/5 border border-border/50 mb-4 group-hover:bg-primary/10 transition-colors">
                                    <feature.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Models preview */}
            {modelsQuery.data?.models && modelsQuery.data.models.length > 0 && (
                <section className="py-24 border-t border-border/30">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                Popular models
                            </h2>
                            <p className="mt-4 text-muted-foreground text-lg">
                                Access the latest and greatest from every major provider.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {modelsQuery.data.models.slice(0, 9).map((model) => (
                                <div
                                    key={model.id}
                                    className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/20 px-4 py-3 hover:border-border/80 transition-colors"
                                >
                                    <div className="size-8 rounded-md bg-primary/5 border border-border/50 flex items-center justify-center text-xs font-bold text-muted-foreground">
                                        {model.company.name.charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{model.name}</p>
                                        <p className="text-xs text-muted-foreground">{model.company.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-24 border-t border-border/30">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Ready to start building?
                    </h2>
                    <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                        Create a free account and start making API calls in minutes.
                    </p>
                    <Button size="lg" asChild className="mt-8 h-12 px-8 text-base">
                        <Link to="/signup">
                            Create free account
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/30 py-8">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="size-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">OpenRouter</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        &copy; 2026 OpenRouter. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}