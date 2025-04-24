
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function CreateAudioForm() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Create New Audio Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Audio Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="indianTitle">Indian Title</Label>
              <Input id="indianTitle" name="indianTitle" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chineseTitle">Chinese Title</Label>
              <Input id="chineseTitle" name="chineseTitle" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tibetanTitle">Tibetan Title</Label>
              <Input id="tibetanTitle" name="tibetanTitle" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="englishTitle">English Title</Label>
              <Input id="englishTitle" name="englishTitle" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textCategory">Text Category</Label>
              <Input id="textCategory" name="textCategory" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentCategoryId">Parent Category ID</Label>
              <Input id="parentCategoryId" name="parentCategoryId" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audioUrl">Audio URL</Label>
              <Input id="audioUrl" name="audioUrl" type="file" accept="audio/*" required />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Entry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
