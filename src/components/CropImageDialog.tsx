import "cropperjs/dist/cropper.css";
import "cropperjs/dist/cropper"
import { useRef } from "react";
import { Cropper, ReactCropperElement } from "react-cropper";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface CropImageDialogProps {
  src: string;
  cropAspectRatio: number;
  onCropped: (blob: Blob | null) => void;
  onClose: () => void;
}

export default function CropImageDialog({
  src,
  cropAspectRatio,
  onCropped,
  onClose,
}: CropImageDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  function crop() {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    cropper.getCroppedCanvas({ maxWidth: 4096,
      maxHeight: 4096}).toBlob((blob) => onCropped(blob), "image/webp");
    onClose();
  }
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar imagem</DialogTitle>
        </DialogHeader>
        <Cropper
          src={src}
          aspectRatio={cropAspectRatio}
          guides={true}
          zoomable={false}
          ref={cropperRef}
          className="mx-auto size-fit"
         
        />
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={crop}>Atualizar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}