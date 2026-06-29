import { ChangeEventHandler, ComponentProps, DragEventHandler, useState } from 'react';
import { cn } from '@/lib/utils';
import { UploadIcon } from 'lucide-react';

type Props = ComponentProps<'input'> & {
    progress?: number;
    onFilesChange?: (files: File[]) => void;
    existingCount?: number;
    maxImages?: number;
};

export function ImageInput({
    className,
    progress,
    defaultValue,
    onFilesChange,
    existingCount,
    maxImages,
    ...props
}: Props) {
    const [hover, setHover] = useState(false);
    const [preview, setPreview] = useState(defaultValue?.toString() ?? null);
    const [count, setCount] = useState(0);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setHover(false);
        const files = Array.from(event.target.files ?? []);

        if (props.multiple && files.length > 0) {
            setPreview(URL.createObjectURL(files[files.length - 1]));
            setCount(files.length);
            onFilesChange?.(files);
        } else if (files[0]) {
            setPreview(URL.createObjectURL(files[0]));
            setCount(0);
            onFilesChange?.([files[0]]);
        }

        // Délègue aussi le onChange parent (pour handleImagesChange dans la page)
        props.onChange?.(event);
    };

    // ← fix drag & drop : géré sur le div, pas sur l'Input
    const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setHover(true);
    };
    const handleDragLeave: DragEventHandler<HTMLDivElement> = () => setHover(false);
    const handleDrop: DragEventHandler<HTMLDivElement> = () => setHover(false);

    const remaining = maxImages != null && existingCount != null
        ? maxImages - existingCount
        : null;

    return (
        <div
            className={cn(
                className,
                'relative group mb-2 grid place-items-center rounded-md overflow-hidden transition-all',
                props['aria-invalid'] && 'ring-destructive ring-2 bg-destructive/10',
                hover && !props.disabled && 'bg-primary/10 text-primary ring-primary ring-2',
                props.disabled && 'opacity-50 cursor-not-allowed',
            )}
            onMouseOver={() => !props.disabled && setHover(true)}
            onMouseLeave={() => setHover(false)}
            onDragOver={!props.disabled ? handleDragOver : undefined}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                type="file"
                {...props}
                onChange={handleChange}
                // plus de onDragOver/onDragLeave ici
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />
            <UploadIcon size={16} />

            {preview && (
                <img
                    src={preview}
                    className={cn(
                        'absolute inset-0 object-cover w-full h-full transition-all',
                        (hover || props['aria-invalid']) && 'opacity-20',
                    )}
                    alt=""
                />
            )}

            {/* Badge fichiers sélectionnés */}
            {count > 1 && (
                <span className="absolute top-1 right-1 z-20 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-black shadow">
                    {count} photos
                </span>
            )}

            {/* Badge slots restants */}
            {remaining !== null && remaining > 0 && (
                <span className="absolute bottom-1 left-1 z-20 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
                    +{remaining} max
                </span>
            )}

            {progress != null && progress > 0 && (
                <div
                    className="h-2 opacity-80 w-full absolute bottom-0 left-0 pointer-events-none origin-left bg-primary transition-transform"
                    style={{ transform: `scaleX(${progress.toFixed(2)})` }}
                />
            )}
        </div>
    );
}