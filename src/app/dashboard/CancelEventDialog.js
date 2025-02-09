import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { AlertCircle } from "lucide-react";
  
  export const CancelEventDialog = ({ isOpen, onClose, onConfirm, eventTitle }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Cancel Event
            </DialogTitle>
            <DialogDescription className="pt-3">
              Are you sure you want to cancel <span className="font-medium">{eventTitle}</span>? 
              This action cannot be undone and all registered participants will be notified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Keep Event
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Cancel Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };