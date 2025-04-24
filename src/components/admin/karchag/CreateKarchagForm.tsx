
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

export function CreateKarchagForm() {
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
          Create New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Karchag Entry</DialogTitle>
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
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentCategoryId">Parent Category ID</Label>
              <Input id="parentCategoryId" name="parentCategoryId" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yeshiTextId">Yeshi Text ID</Label>
              <Input id="yeshiTextId" name="yeshiTextId" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sermon">Sermon</Label>
              <Input id="sermon" name="sermon" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Input id="vehicle" name="vehicle" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="translationType">Translation Type</Label>
              <Input id="translationType" name="translationType" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dergeTextId">Derge Text ID</Label>
              <Input id="dergeTextId" name="dergeTextId" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dergeVolNumber">Derge Volume Number</Label>
              <Input id="dergeVolNumber" name="dergeVolNumber" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dergeStartPage">Derge Start Page</Label>
              <Input id="dergeStartPage" name="dergeStartPage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dergeEndPage">Derge End Page</Label>
              <Input id="dergeEndPage" name="dergeEndPage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pedurmaVolNumber">Pedurma Volume Number</Label>
              <Input id="pedurmaVolNumber" name="pedurmaVolNumber" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pedurmaStartPage">Pedurma Start Page</Label>
              <Input id="pedurmaStartPage" name="pedurmaStartPage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pedurmaEndPage">Pedurma End Page</Label>
              <Input id="pedurmaEndPage" name="pedurmaEndPage" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yeshiVolNumber">Yeshi Volume Number</Label>
              <Input id="yeshiVolNumber" name="yeshiVolNumber" />
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
