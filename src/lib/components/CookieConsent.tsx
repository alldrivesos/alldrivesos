import { Button, Checkbox } from "@chakra-ui/react";
import { dialog, Switch } from "@material-tailwind/react";
import { XCircle, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function NewCookieConsent() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const form = useForm({
    defaultValues: {
      necessary: true,
      analytics: true,
    },
  });

  // Helper function to set a cookie with an expiration date
  const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  };

  // Save preferences to cookies
  const savePreferences = (data: {
    necessary: boolean;
    analytics: boolean;
  }) => {
    const preferencesJson = JSON.stringify(data);
    setCookie("cookie_preferences", preferencesJson, 365); // Save for 1 year
    setCookie("cookie_consent_status", "true", 365); // Save for 1 year
    toast.info("Preferences Saved");
    // The form has method="dialog", so submitting it will automatically close the dialog.
    // No explicit dialogRef.current.close() is typically needed here.
  };

  const onSubmit = (data: { necessary: boolean; analytics: boolean }) => {
    savePreferences(data);
  };

  // Complete Accept All handler
  const handleAcceptAll = () => {
    // Accept all cookies (necessary and analytics)
    const allAccepted = {
      necessary: true,
      analytics: true,
    };
    savePreferences(allAccepted);
    dialogRef.current?.close();
    toast.success("All cookies accepted");
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className=" z-20 h-lvh bg-black backdrop-blur-sm bg-opacity-20   max-w-none w-screen max-h-none grid place-content-center"
        onClose={() => console.log("Dialog closed")} // Add onClose handler for debugging
      >
        <div className="p-6 shadow-md ring rounded-md bg-primary text-white space-y-2 flex flex-col max-w-xl">
          <div
            id="closeer"
            className="p-2 hover:bg-gray-500/20 cursor-pointer rounded-full w-fit ml-auto"
            onClick={() => {
              dialogRef.current.close();
            }}
          >
            <XIcon />{" "}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Cookie Consent</h2>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 isolate"
          >
            <p className="text-sm">
              Manage your cookie preferences here. Necessary cookies cannot be
              disabled as they are essential for the website to function
              properly.
            </p>
            <section className="space-y-6 flex flex-col">
              <div className="flex items-center">
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold">Necessary</h3>
                  <p className="text-xs">
                    Required for the website to function properly.
                  </p>
                </div>
                <div>
                  <Switch {...form.register("necessary")} disabled />
                </div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1 flex-1">
                  <h3 className="font-bold"> Analytics</h3>
                  <p className="text-xs">
                    Help us improve our website by collecting usage information.
                  </p>
                </div>
                <div className="">
                  <Switch {...form.register("analytics")} />
                </div>
              </div>
              <div className="ml-auto">
                <Button type="submit">Save Preferences</Button>
              </div>
            </section>
          </form>
        </div>
      </dialog>
      <div className="fixed bottom-0 min-h-24 p-4 bg-primary left-0 right-0 z-20 flex text-white items-center ">
        <div className="flex flex-col lg:flex-row lg:items-center container mx-auto flex-wrap gap-2">
          <div className="flex-1">
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By clicking
            "Accept All", you consent to our use of cookies.
          </div>
          <div className="space-x-2 md:ml-2">
            <Button
              size={"sm"}
              className="bg-primary"
              onClick={() => dialogRef.current?.showModal()}
            >
              Manage Preferences
            </Button>
            <Button size={"sm"} onClick={handleAcceptAll}>
              Accept All{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
