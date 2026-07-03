import { ChangeEventHandler, ComponentProps, DragEventHandler, useRef, useState } from 'react';
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [hover, setHover] = useState(false);
    const [preview, setPreview] = useState(defaultValue?.toString() ?? null);
    const [count, setCount] = useState(0);

    const processFiles = (files: File[]) => {
        if (files.length === 0) return;

        if (preview?.startsWith('blob:')) {
            URL.revokeObjectURL(preview);
        }

        if (props.multiple && files.length > 0) {
            setPreview(URL.createObjectURL(files[files.length - 1]));
            setCount(files.length);
            onFilesChange?.(files);
        } else {
            setPreview(URL.createObjectURL(files[0]));
            setCount(0);
            onFilesChange?.([files[0]]);
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setHover(false);
        const files = Array.from(event.target.files ?? []);
        processFiles(files);
        props.onChange?.(event);
    };

    const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setHover(true);
    };
    const handleDragLeave: DragEventHandler<HTMLDivElement> = () => setHover(false);

    const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setHover(false);

        const files = Array.from(e.dataTransfer.files ?? []);
        if (files.length === 0 || !inputRef.current) return;

        const dataTransfer = new DataTransfer();
        files.forEach((file) => dataTransfer.items.add(file));
        inputRef.current.files = dataTransfer.files;

        // dispatchEvent déclenche déjà handleChange → processFiles() + props.onChange
        // Ne PAS rappeler processFiles ici, sinon double mise à jour du state = race de rendu
        const changeEvent = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(changeEvent);
    };

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
            onDrop={!props.disabled ? handleDrop : undefined}
        >
            <input
                ref={inputRef}
                type="file"
                {...props}
                onChange={handleChange}
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

            {count > 1 && (
                <span className="absolute top-1 right-1 z-20 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-black shadow">
                    {count} photos
                </span>
            )}

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