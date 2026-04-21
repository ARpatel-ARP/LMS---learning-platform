"use client"
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate()

  const changeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successful")
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup failed") 
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successful")
      navigate("dashboard")
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login failed")  
    }
  },
    [loginLoading, registerLoading, loginData, registerData, loginError, registerError]);
  return (
    <div className="flex items-center w-full justify-center mt-25">
      <Tabs defaultValue="Sign up" className="w-100 shadow-2xl rounded-2xl p-2">
        <TabsList>
          <TabsTrigger value="Sign up">Sign up</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Sign up">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Create a new Account</CardTitle>
              <CardDescription>Enter the details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Full name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={signupInput.name}
                      type="text"
                      placeholder="Enter your full name"
                      onChange={(e) => changeHandler(e, "signup")}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      name="email"
                      value={signupInput.email}
                      onChange={(e) => changeHandler(e, "signup")}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Create Password</Label>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      value={signupInput.password}
                      onChange={(e) => changeHandler(e, "signup")}
                      type="password"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                disabled={registerLoading}
                onClick={() => handleRegistration("signup")}
                type="submit"
                className="w-full"
              >
                {registerLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 animate-spin w-4" /> Loading
                    please wait...
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      onChange={(e) => changeHandler(e, "login")}
                      name="email"
                      value={loginInput.email}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      onChange={(e) => changeHandler(e, "login")}
                      name="password"
                      value={loginInput.password}
                      type="password"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                disabled={loginLoading}
                onClick={() => handleRegistration("login")}
                type="submit"
                className="w-full"
              >
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
                    please wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
