import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDown, Sparkles, Zap } from "lucide-react";
import { GPTmodel } from "@/lib/types";
import * as Checkbox from "@radix-ui/react-checkbox";
import { currentUser } from "@/convex/users";
import { UpgradeModel } from "./UpgradeModel";

function SelectModel() {
  const user = useQuery(api.users.currentUser, {});

  const { mutate: selectGPT, pending: selectGPTPending } = useApiMutation(
    api.users.selectGPT
  );

  const [openUpgradeModel, setOpenUpgradeModel] = useState(false);

  const [openSelect, setOpenSelect] = useState(false);

  const isSubscribed = user && (user?.endsOn ?? 0) > Date.now();

  const gptVersion = user?.model === GPTmodel.GPT_3 ? "3.5" : "4";

  const handleClick = (model: GPTmodel) => {
    if (model === GPTmodel.GPT_3) {
      selectGPT({ model });
      setOpenSelect(!openSelect);
      return;
    }

    if (isSubscribed) {
      selectGPT({ model });
    } else {
      setOpenUpgradeModel(true);
    }
    setOpenSelect(!openSelect);
  };

  if (user === undefined || !user) {
    return <div>Loading...</div>;
  }

  const toggleOpen = () => {
    setOpenSelect(!openSelect);
  };

  return (
    <div>
      <UpgradeModel open={openUpgradeModel} setOpen={setOpenUpgradeModel} />
      <Popover open={openSelect}>
        <PopoverTrigger
          onClick={toggleOpen}
          className="flex space-x-2 font-semibold items-center align-baseline text-white"
        >
          <p className="h-5">ChatGPT</p>
          <p className="text-white/70 w-5 h-5">{gptVersion}</p>
          <ChevronDown className="text-white/70" />
        </PopoverTrigger>
        <PopoverContent
          className="flex flex-col border-0
         bg-neutral-700 text-white p-3 space-y-4"
        >
          <div
            onClick={() => handleClick(GPTmodel.GPT_3)}
            className="flex items-center text-start cursor-pointer 
            rounded-md justify-center space-x-2 p-2 w-full h-full 
            hover: bg-neutral-600"
          >
            <Zap className="w-6 h-6" />
            <div className="w-full">
              <p className="font-normal">GPT 3.5</p>
              <p className="text-white/70">Great for everyday tasks.</p>
            </div>
            <Checkbox.Root id="term1" checked={user.model === GPTmodel.GPT_3}>
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
          <div
            onClick={() => handleClick(GPTmodel.GPT_4)}
            className="flex items-center text-start cursor-pointer 
            rounded-md justify-center space-x-2 p-2 w-full h-full 
            hover: bg-neutral-600"
          >
            <Sparkles className="w-6 h-6" />
            <div className="w-full">
              <p className="font-normal">GPT-4</p>
              <p className="text-white/70">Our smartest and best model.</p>
              {!isSubscribed && (
                <div
                  onClick={() => setOpenUpgradeModel(true)}
                  className="w-full p-2 rounded-lg text-white text-xs 
              text-center font-normal cursor-pointer 
              bg-purple-500 active:bg-purple-700 mt-1.5"
                >
                  Upgrade to plus
                </div>
              )}
            </div>
            <Checkbox.Root id="term1" checked={user.model === GPTmodel.GPT_4}>
              <Checkbox.Indicator>
                <CheckIcon />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SelectModel;
