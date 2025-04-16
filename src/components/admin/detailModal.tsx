import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  

  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  
  export default function OrderDetailModal() {
    const [open, setOpen] = useState(false);

  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Chi tiết</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md ">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    );
  }
  