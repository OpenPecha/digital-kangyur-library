
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { AudioEntry } from "@/types/audio";

interface AudioListProps {
  entries: AudioEntry[];
}

export function AudioList({ entries }: AudioListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>English Title</TableHead>
            <TableHead>Tibetan Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Audio URL</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.englishTitle}</TableCell>
              <TableCell>{entry.tibetanTitle}</TableCell>
              <TableCell>{entry.textCategory}</TableCell>
              <TableCell>{entry.audioUrl}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
