import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import { DottedSeparator } from "../dotted-separator";
import { Fragment, useEffect, useState } from "react";
import { makeHTTPCall } from "@/helper/make-http-call";
import { toast } from "sonner";
import WorkspaceMemberavatar from "./Member-avatar";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DashboardLoading from "@/pages/dashboard/DashboardLoading";
import { useDeleteConfirm } from "@/hooks/Delete-Confirm-Hook";

export default function MemberList() {
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

  const [DeleteMemberDialog, confirmDelete] = useDeleteConfirm(
    "Delete Workspace Member",
    "Are you sure you want to delete this workspace?",
    "destructive"
  );

  const [UpdateMemberDialog, confirmUpdate] = useDeleteConfirm(
    "Delete Workspace Member",
    "Are you sure you want to delete this workspace?",
    "destructive"
  );

  // Fetch members data from API
  useEffect(() => {
    let isMounted = true; // Prevent setting state if unmounted

    const fetchMembers = async () => {
      try {
        setIsFetching(true);
        const response = await makeHTTPCall(
          `workspace/member/${param.id}`,
          "GET",
          true
        );
        if (response.error === false && isMounted) {
          toast.success("Member List Success");
          setMembers(response.members);
        }

        if (response.error === true) {
          toast.error(response.message);
          navigate("");
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("An error occurred while fetching members.");
        }
      } finally {
        if (isMounted) setIsFetching(false); // Reset fetching state
      }
    };

    fetchMembers();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [param.id, navigate]);

  const handleDelete = async (memberId) => {
    setIsLoading(true);
    try {
      const ok = await confirmDelete();
      if (!ok) return;

      const response = await makeHTTPCall(
        `workspace/member/${memberId}`,
        "DELETE",
        true
      );
      if (response.error === false) {
        toast.success("Workspace deleted successfully!");
        setMembers((prevMembers) =>
          prevMembers.filter((m) => m.id !== memberId)
        );
        navigate("/");
      } else {
        throw new Error(response.message);
      }
      console.log("delete");
    } catch (error) {
      console.error("Error during workspace deletion:", error);
      toast.error(error.message || "Failed to delete workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateMembers = async (memberId, role) => {
    setIsLoading(true);
    try {
      const ok = await confirmUpdate();
      if (!ok) return;

      const response = await makeHTTPCall(
        `workspace/member/${memberId}/role`,
        "DELETE",
        true,
        {
          role: role,
        }
      );
      if (response.error === false) {
        toast.success("Workspace Update successfully!");
        setMembers((prevMembers) =>
          prevMembers.map((m) =>
            m.id === memberId ? { ...m, role: role.toLowerCase() } : m
          )
        );
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error during workspace updation:", error);
      toast.error(error.message || "Failed to update workspace.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading || isFetching) {
    return <DashboardLoading />;
  }

  return (
    <>
      <Card className="w-full h-full border-none shadow-none">
        <DeleteMemberDialog />
        <UpdateMemberDialog />
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button variant="secondary" size="sm" asChild>
            <Link to={`/workspace/${param.id}`}>
              <ArrowLeftIcon className="size-4 mr-2" />
              Back
            </Link>
          </Button>
          <CardTitle className="text-xl font-bold">Member List</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          {members.length === 0 ? (
            <div>No members in this workspace.</div>
          ) : (
            members.map((member, index) => (
              <Fragment key={member.id}>
                <div className="flex items-center gap-2">
                  <WorkspaceMemberavatar
                    className="size-10"
                    fallBackClassName="text-lg"
                    name={member._user.name}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">
                      {member._user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member._user.email}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="ml-auto"
                        size="icon"
                        variant="secondary"
                        type="button"
                      >
                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => updateMembers(member._id, "admin")}
                      >
                        Set as Administration
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => updateMembers(member._id, "member")}
                      >
                        Set as Member
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium text-amber-700"
                        onClick={() => handleDelete(member._id)}
                      >
                        Remove {member._user.name}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {index < members.length - 1 && <Separator className="my-2.5" />}
              </Fragment>
            ))
          )}
        </CardContent>
      </Card>
    </>
  );
}
