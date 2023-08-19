"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { User as AuthUser } from "next-auth";
import clientPromise from "@/lib/mongodb";

const formSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username needs to be at least 4 characters long." })
      .max(20, { message: "Username must not exceed 20 characters" }),
    email: z.string().email({ message: "Invalid Email." }),
    password: z.string().min(8, { message: "Password needs to be at least 8 characters long." }),
    confirmPw: z.string().min(8, { message: "Password needs to be at least 8 characters long." }),
  })
  .refine(data => data.password === data.confirmPw, {
    message: "Password don't match.",
    path: ["confirmPw"],
  });

type TSignUp = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [userCreated, setUserCreated] = useState(false);
  const form = useForm<TSignUp>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPw: "",
    },
  });
  // Omit<AuthUser, "id">
  async function onSubmit(values: TSignUp) {
    const user: AuthUser = {
      email: values.email,
      password: values.password,
      role: "default",
      name: values.username,
      id: values.username,
    };
    const res = await fetch("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(user),
    }).then(res => {
      console.log(res);
      return res.json();
    });
    console.log(res);
  }

  return (
    <div className="flex flex-col gap-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="password" placeholder="min. 8 characters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="min. 8 characters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={`${userCreated ? "visible" : "hidden"}`}>
            <span className="text-green-600">User successfully created.</span>
          </div>
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
}
