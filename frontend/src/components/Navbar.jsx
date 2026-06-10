import { Menu, School } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect } from "react";
import DarkMode from "@/DarkMode.jsx";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    await logoutUser()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User log out")
      navigate("/login")
    }
  }, [isSuccess])
  return (
    <div className="h-16 w-full bg-gray-100/70 dark:bg-[#0A0A0A] border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 ring-0 duration-300 z-10 ">
      {/* Desktop */}
      <div className="md:flex max-w-7xl mx-auto hidden justify-between p-4">
        <div className="flex gap-2">
          <School size={"30"} />
          <Link to="/">
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuItem className={"font-bold"}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to="my-learning">My-Learning</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                {
                  user.role === "instructor" && (
                    <DropdownMenuItem><Link to="admin/dashboard">Dashboard</Link></DropdownMenuItem>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !isLoginPage && (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Phone */}
      <div className="md:hidden flex items-center justify-between p-4 ">
        <Link to="/">
        <h1 className="font-bold">E-Learning</h1>
        </Link>
        <MobileNavbar />
      </div>
    </div>
  );
};
export default Navbar;

const MobileNavbar = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const isLoginPage = location.pathname === "/login"
  const [logoutUser, { isSuccess, data }] = useLogoutUserMutation()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    await logoutUser()
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged out")
      navigate("/login")
    }
  }, [isSuccess])
  return (
    <Sheet>
      <SheetTrigger asChild>
      <div className="items-center flex gap-x-3">
         {
          user ? ( <Avatar>
                  <AvatarImage
                    src={user?.photoUrl}
                    alt="@shadcn"
                  />
                </Avatar>) : !isLoginPage && (
            <>
             <div className="flex items-center gap-x-2">
               <Button asChild>
                <SheetClose asChild>
                <Link to="/login">Login</Link>
            </SheetClose>
              </Button>
             </div>
            </>
          )
        }
        <DarkMode />
      </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-10 mx-auto p-5">
        <div className="flex gap-5 items-center">
          <SheetTitle className="font-bold text-2xl">
            <Link to="/">E-Learning</Link></SheetTitle>
        </div>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 w-full text-xl">
          {user && (
            // ← show these only when logged in
            <>
              <Button variant="outline" asChild>
                <SheetClose asChild>
                <Link to="/">Home</Link>
                </SheetClose>
              </Button>
              <Button variant="outline" asChild>
                <SheetClose asChild>
                <Link to="/my-learning">My Learning</Link>
                </SheetClose>
              </Button>
              <Button variant="outline" asChild>
                <SheetClose asChild>
                <Link to="/profile">Edit Profile</Link>
                </SheetClose>
              </Button>
              <Button variant="outline" onClick={logoutHandler}>Log out</Button>
            </>
          ) }
        </nav>
        {user?.role === "instructor" && (
            <Button type="submit">
            <SheetClose asChild>
              <Link to="/admin/dashboard">Dashboard</Link>
            </SheetClose>
              </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};
