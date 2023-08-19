"use client";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid Email." }),
  password: z.string().min(8, { message: "Password too short." }),
});
type TSignIn = z.infer<typeof formSchema>;

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<TSignIn>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: TSignIn) {
    form.clearErrors();
    const res = signIn("regular_credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}`,
    }).then(res => {
      console.log(res);
      if (res?.error) {
        form.setError("root", { message: "Invalid credentials." });
      } else if (res?.url) {
        router.replace(res.url);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="John@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.errors.root?.message ? (
            <div>
              <span className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.root.message}</span>
            </div>
          ) : (
            <></>
          )}
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
}
