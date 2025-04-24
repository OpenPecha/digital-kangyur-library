
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KarchagEntry } from "@/types/karchag";

interface KarchagListProps {
  entries: KarchagEntry[];
}

export function KarchagList({ entries }: KarchagListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>English Title</TableHead>
            <TableHead>Tibetan Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Yeshi Text ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.yeshiTextId}>
              <TableCell>{entry.englishTitle}</TableCell>
              <TableCell>{entry.tibetanTitle}</TableCell>
              <TableCell>{entry.category}</TableCell>
              <TableCell>{entry.yeshiTextId}</TableCell>
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
