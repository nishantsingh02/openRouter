import { useElysiaClient } from "../providers/Eden";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../components/ui/card";
import { ArrowRight, Mail, Lock, Loader2, AlertCircle, CheckCircle2, Zap } from "lucide-react";

export function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const elysiaClient = useElysiaClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const response = await elysiaClient.auth["sign-in"].post({
                email,
                password,
            });
            if (response.error) {
                const errValue = response.error.value as { message?: string } | undefined;
                throw new Error(errValue?.message || "Invalid credentials");
            }
            return response.data;
        },
        onSuccess: () => {
            setTimeout(() => navigate("/dashboard"), 1000);
        },
    });

    return (
        <div className="dark min-h-screen relative flex items-center justify-center bg-background overflow-hidden">
            {/* Animated gradient orbs */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, oklch(0.6 0.2 264) 0%, transparent 70%)",
                    top: "-10%",
                    left: "-5%",
                    animationDuration: "8s",
                }}
            />
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px] animate-pulse"
                style={{
                    background:
                        "radial-gradient(circle, oklch(0.7 0.15 55) 0%, transparent 70%)",
                    bottom: "-15%",
                    right: "-10%",
                    animationDuration: "12s",
                    animationDelay: "2s",
                }}
            />

            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.08) 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-[420px] px-6">
                {/* Brand */}
                <div className="flex items-center justify-center gap-2.5 mb-10">
                    <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 border border-primary/20">
                        <Zap className="size-4 text-primary" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-foreground">
                        OpenRouter
                    </span>
                </div>

                <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-xl tracking-tight">
                            Welcome back
                        </CardTitle>
                        <CardDescription className="text-muted-foreground/80">
                            Sign in to your OpenRouter account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                mutation.mutate({
                                    email: emailRef.current!.value,
                                    password: passwordRef.current!.value,
                                });
                            }}
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                                    <Input
                                        id="email"
                                        ref={emailRef}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="pl-10 h-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                                    <Input
                                        id="password"
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-10 h-10"
                                        required
                                    />
                                </div>
                            </div>

                            {mutation.isError && (
                                <div className="flex items-start gap-2.5 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3.5 py-3">
                                    <AlertCircle className="size-4 shrink-0 mt-0.5" />
                                    <span>
                                        {mutation.error?.message ||
                                            "Something went wrong. Please try again."}
                                    </span>
                                </div>
                            )}

                            {mutation.isSuccess && (
                                <div className="flex items-start gap-2.5 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3.5 py-3">
                                    <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                                    <span>Signed in! Redirecting to dashboard...</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-10 mt-2"
                                disabled={mutation.isPending || mutation.isSuccess}
                            >
                                {mutation.isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight className="size-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="justify-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-foreground hover:underline underline-offset-4 font-medium transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}