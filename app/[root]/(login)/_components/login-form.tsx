"use client";

import { cn } from "@/lib/utils";
import { LoginResponse, Role, useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, "Phone is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "+998900000001",
      password: "SuperAdmin123!",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const data = await login(values);
      const role = ((data as LoginResponse|undefined)?.user as { role: Role })?.role;

      if (role === "SUPERADMIN") {
        router.push("/super-admin");
      } else if (role === "DIRECTOR") {
        router.push("/owner");
      } else if (role === "RECEPTION") {
        router.push("/reception");
      } else if (role === "TEACHER") {
        router.push("/trainer");
      } else if (role === "STUDENT") {
        router.push("/atlet");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden rounded-lg p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Phone</FieldLabel>
                <Input
                  id="email"
                  placeholder="+999090905"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                />

                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              {/* Social login buttonlaringni shu yerda o'z holicha qoldirishing mumkin */}
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1gJXq1-oBPdNoUyal9OIh19rzecxFsya9GamnjvAYfJp6pccG4xE1eQ&s=10"
              alt="Login"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
