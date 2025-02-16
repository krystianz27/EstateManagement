"use client";

import {
  useDeleteIssueMutation,
  useGetSingleIssueQuery,
} from "@/lib/redux/features/issue/issueApiSlice";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AuthFormHeader } from "../forms/auth";
import { CheckCheck, CircleDot, EyeIcon, Hotel } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface IssueDetailsProps {
  params: {
    id: string;
  };
}

export default function IssueDetails({ params }: IssueDetailsProps) {
  const { id } = params;

  const { data: currentUser } = useGetUserProfileQuery();

  const { data: issueData, isError } = useGetSingleIssueQuery(id);
  const issue = issueData?.issue;

  const router = useRouter();

  const canUpdate = issue?.assigned_to === currentUser?.profile.full_name;
  const canDelete = issue?.reported_by === currentUser?.profile.full_name;

  const [deleteIssue] = useDeleteIssueMutation();

  const handleDeleteIssue = async () => {
    if (issue?.id) {
      try {
        await deleteIssue(issue.id).unwrap();
        router.push("/profile");
        toast.success("Your Issue was deleted");
      } catch (e) {
        const errorMessage = extractErrorMessage(e);
        toast.error(errorMessage ?? "An error occurred");
      }
    }
  };

  if (isError || !issue) {
    return <div>Error loading issue details.</div>;
  }

  return (
    <Card className="rounded-xl border border-dashed dark:border-gray">
      <AuthFormHeader
        title={issue.title}
        linkText="Go back to profile"
        linkHref="/profile"
      />

      <CardHeader className="flex flex-row justify-between gap-4 border-b border-b-eerieBlack p-4 sm:p-6 md:flex-row md:items-center md:gap-6">
        <div className="grid gap-0.5">
          <CardTitle className="dark:text-platinum">
            <p className="flex items-center space-x-2">
              <Hotel className="tab-icon" />
              <span className="font-bold dark:text-babyPowder">
                Apartment Number:{" "}
              </span>
              <span className="text-2xl">{issue.apartment_unit}</span>
            </p>
          </CardTitle>

          <CardDescription className="mt-2">
            <p className="flex items-center space-x-2">
              <CheckCheck className="tab-icon" />
              <span className="text-xl-font-baby">Occupied By: </span>
              <span className="text-xl-font-baby">{issue.reported_by}</span>
            </p>
          </CardDescription>
        </div>

        <div className="flex flex-col gap-y-3">
          {canUpdate && (
            <Link href={`/issue/update-issue/${id}`}>
              <Button
                className="ml-auto h-10 max-w-[200px] bg-electricIndigo text-babyPowder dark:bg-electricIndigo dark:text-babyPowder sm:ml-0 md:max-w-[300px]"
                size="sm"
                variant="outline"
              >
                Update Issue
              </Button>
            </Link>
          )}

          {canDelete && (
            <Button
              onClick={handleDeleteIssue}
              className="ml-auto h-10 max-w-[200px] bg-red-500 text-babyPowder dark:bg-red-500 dark:text-babyPowder sm:ml-0 md:max-w-[300px]"
              size="sm"
              variant="outline"
            >
              Delete Issue
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="border-b border-b-eerieBlack">
        <CardDescription className="mt-3">
          <div className="flex items-center space-x-2">
            <CircleDot className="tab-icon" />
            <span className="text-xl-font-baby">{issue.description}</span>
          </div>
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-2 flex flex-row justify-between dark:text-lime-500">
        <p className="text-lg">
          assigned to:&nbsp;
          <span className="dark:text-platinum">
            {issue.assigned_to ?? "Not assigned Yet!"}
          </span>
        </p>
        <p className="text-lg">
          Status:&nbsp;
          <span className="dark:text-platinum">{issue.status}</span>
        </p>
        <p className="text-lg">
          Priority:&nbsp;
          <span className="dark:text-platinum">{issue.priority}</span>
        </p>
        <p className="flex flex-row items-center">
          <EyeIcon className="mr-1 size-5" />
          <span className="text-lg dark:text-platinum">
            View Count:&nbsp; {issue.view_count}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
