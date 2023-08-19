import LoginForm from "@/components/LoginForm/LoginForm";
import SignUpForm from "@/components/SignUpForm/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SignIn() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-5 py-10">
      <Tabs defaultValue="signIn" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signIn">Login</TabsTrigger>
          <TabsTrigger value="signUp">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <div className="flex flex-col w-full border-2 rounded-lg p-4">
            <LoginForm></LoginForm>
          </div>
        </TabsContent>
        <TabsContent value="signUp">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <SignUpForm></SignUpForm>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex flex-row justify-center items-center w-full gap-3 py-4">
      <Separator className="w-1/3" orientation="horizontal"></Separator>
      <span className="text-sm text-muted-foreground">or</span>
      <Separator className="w-1/3" orientation="horizontal"></Separator>
    </div>
  );
}
