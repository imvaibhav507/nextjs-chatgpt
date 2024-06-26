import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

interface UpgradeModelProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const UpgradeModel = ({ open, setOpen }: UpgradeModelProps) => {
  // const upgrade = useAction(api.stripe.pay);
  const router = useRouter();

  // const handleUpgrade = async () => {
  //   const url = await upgrade({});

  //   if (!url) return;
  //   router.push(url);
  // };

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogContent className="bg-neutral-700 text-white border-none max-w-2xl">
        <DialogHeader className="p-3">
          <DialogTitle>Upgrade your subscription</DialogTitle>
        </DialogHeader>
        <Separator className="h-[1px] bg-white/20" />
        <div className="flex justify-between">
          {/* {free plan} */}
          <div className="w-1/2 p-4 gap-y-2">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="font-thin text-white">USD $0/month</p>
            <Button
              disabled
              className="font-semibold text-xs bg-neutral-500 p-4 my-4 text-wrap"
            >
              Your current subscription
            </Button>
            <h4 className="text-sm mb-4"> For newcomers just starting</h4>
            <div className="flex flex-col gap-y-3 text-sm">
              <div className="flex gap-x-4 items-center">
                <Check className="h-4 w-4" />
                <p>Limitless messaging and history.</p>
              </div>
              <div className="flex gap-x-4 items-center">
                <Check className="h-4 w-4" />
                <p>Utilize our GPT-3.5 model.</p>
              </div>
              <div className="flex gap-x-4 items-center">
                <Check className="h-4 w-4" />
                <p>Available at Web, iOS and android.</p>
              </div>
            </div>
          </div>
          <Separator
            aria-orientation="vertical"
            className="w-[1px] bg-white/20"
          />
          {/* {paid plans} */}
          <div className="w-1/2 p-4 gap-y-2">
            <h3 className="text-lg font-semibold">Plus</h3>
            <p className="font-thin text-white/95"> USD $20/month</p>
            <Button
              className="font-semibold text-xs bg-green-600 hover:bg-green-700 p-4 my-4"
              // onClick={handleUpgrade}
            >
              Upgrade to plus
            </Button>
            <h4 className="text-sm mb-4">Unlock GPT-4</h4>
            <div className="flex flex-col gap-y-3 text-sm">
              <div className="flex gap-x-4 items-center">
                <Check className="h-4 w-4" />
                <p>More intelligent model.</p>
              </div>
              <div className="flex gap-x-4 items-center">
                <Check className="h-4 w-4" />
                <p>Better detail handling.</p>
              </div>
              <div className="flex gap-x-4 items-center">
                <Check className="h-4 w-4" />
                <p>Greater sensitivity to contextual nuances.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
