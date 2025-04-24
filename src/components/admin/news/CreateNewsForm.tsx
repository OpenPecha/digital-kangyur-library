
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function CreateNewsForm() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create News Entry</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create News Entry</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input placeholder="English Title" />
              <Textarea placeholder="English Description" className="h-32" />
            </div>
            <div className="space-y-2">
              <Input placeholder="Tibetan Title" className="font-tibetan" />
              <Textarea placeholder="Tibetan Description" className="h-32 font-tibetan" />
            </div>
          </div>
          <Button type="submit" className="w-full">Create News Entry</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
