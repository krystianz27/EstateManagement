"use client";
import { useUpdateIssueMutation } from "@/lib/redux/features/issue/issueApiSlice";
import React from "react";
import { IssueUpdateSchema } from "@/lib/validation";
import { extractErrorMessage } from "@/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { statusOptions } from "@/constant";
import customStyles from "../selectStyles";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

const ClientOnly = dynamic<{ children: React.ReactNode }>(
  () => Promise.resolve(({ children }) => <>{children}</>),
  { ssr: false },
);

interface UpdateParamsProps {
  params: {
    id: string;
  };
}

export default function IssueUpdateForm({ params }: UpdateParamsProps) {
  const issueId = params.id;
  const [updateIssue, { isLoading }] = useUpdateIssueMutation();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IssueUpdateSchema>();

  const onSubmit = async (formValues: IssueUpdateSchema) => {
    if (issueId) {
      const valuesWithIssueId = {
        ...formValues,
        issueId,
      };

      try {
        await updateIssue(valuesWithIssueId).unwrap();
        toast.success(
          "The Issue has been updated. A confirmation email has been sent to the tenant",
        );
        reset();
        router.push("/profile");
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        toast.error(errorMessage || "An error occurred");
      }
    }
  };
  return (
    <main>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-md flex-col gap-4 dark:text-black"
      >
        <div>
          <label htmlFor="Status" className="h4-semibold dark:text-babyPowder">
            Status
          </label>
          <div className="mt-1 flex items-center space-x-3 text-sm">
            <ClientOnly>
              <Controller
                name="status"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    className="mt-1 w-full"
                    options={statusOptions}
                    value={statusOptions.find(
                      (option) => option.value === value,
                    )}
                    onChange={(val) => onChange(val?.value)}
                    onBlur={onBlur}
                    placeholder="Update the Issue Status"
                    instanceId="issue-status-select"
                    styles={customStyles}
                  />
                )}
              />
            </ClientOnly>
          </div>
          {errors.status && (
            <p className="mt-2 text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="h4-semibold mt-2 w-full bg-eerieBlack text-white dark:bg-pumpkin dark:text-amberText"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Update Status"}
        </Button>
      </form>
    </main>
  );
}
