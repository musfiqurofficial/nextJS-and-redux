"use client";

import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { MdNightsStay } from "react-icons/md";
import { WiDaySunnyOvercast } from "react-icons/wi";

export default function SwitchToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setEnabled(prefersDark);

    document.body.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", enabled);
  }, [enabled]);

  return (
    <div className="flex justify-center items-center gap-2">
      {enabled ? (
        <MdNightsStay className="w-6 h-6 text-[#fefefe]" />
      ) : (
        <WiDaySunnyOvercast className="w-6 h-6 text-blue-500" />
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`group relative flex h-6 w-[52px] cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-white/30" : "bg-black/10"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block size-4 bg-[#fefefe] rounded-full ring-0 shadow-lg transition duration-200 ease-in-out ${
            enabled ? "translate-x-7 " : "translate-x-0 "
          }`}
        />
      </Switch>
    </div>
  );
}
