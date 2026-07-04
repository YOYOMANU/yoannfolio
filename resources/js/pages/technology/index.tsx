import { Form, Link, router } from '@inertiajs/react';
import { EditIcon, ImageIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { SortableTableHead } from '@/components/sortable-table-head';
import { TopAction } from '@/components/top-action';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { CollectionPagination } from '@/components/ui/Collection-Pagination';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { WithAppLayout } from '@/layouts/app-layout';
import technology from '@/routes/technology';
import type { BreadcrumbItem, PaginatedCollection, Technology } from '@/types';

const Breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Technologies',
        href: technology.index()
    },
];

type Props = {
    collection: PaginatedCollection<Technology>;
    q: string;
};

export default WithAppLayout(Breadcrumbs, ({ collection, q }: Props) => {
    const [technologyToDelete, setTechnologyToDelete] = useState<number | null>(null);

    const handleDelete = () => {
        if (technologyToDelete === null) {
            return;
        }

        router.delete(technology.destroy({ technology: technologyToDelete }).url, {
            onFinish: () => setTechnologyToDelete(null),
        });
    };



    return (
        <div className="space-y-4">
            <TopAction collapsibleSearch>
                <Form {...technology.index.form} className="flex items-center gap-2">
                    <Input placeholder="Rechercher..." name="q" defaultValue={q ?? ''} autoFocus />
                    <Button>Rechercher</Button>
                </Form>
            </TopAction>

            <Button
                asChild
                variant="outline"
                className="w-full md:hidden"
            >
                <Link href={technology.create()}>
                    <PlusIcon />
                    Ajouter une technologie
                </Link>
            </Button>

            {/* ---------- Vue mobile : cards ---------- */}
            <div className="space-y-3 md:hidden">
                {collection.data.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
                    >
                        {item.image ? (
                            <img
                                src={item.image}
                                alt=""
                                className="size-16 shrink-0 rounded-md object-cover"
                            />
                        ) : (
                            <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground">
                                <ImageIcon size={20} />
                            </div>
                        )}

                        <div className="min-w-0 flex-1">
                            <Link
                                href={technology.edit({
                                    technology: parseInt(item.id),
                                })}
                                className="block truncate font-medium hover:underline"
                            >
                                {item.name}
                            </Link>
                            <span className="text-sm text-muted-foreground">
                                #{item.id}
                            </span>
                        </div>

                        <div className="flex shrink-0 gap-2">
                            <Button
                                asChild
                                size="icon"
                                variant="outline"
                            >
                                <Link
                                    href={technology.edit({
                                        technology: parseInt(item.id),
                                    })}
                                >
                                    <EditIcon size={16} />
                                </Link>
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive-outline"
                                onClick={() =>
                                    setTechnologyToDelete(parseInt(item.id))
                                }
                            >
                                <TrashIcon size={16} />
                            </Button>
                        </div>
                    </div>
                ))}

                {collection.data.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        Aucune technologie trouvée.
                    </p>
                )}
            </div>

            {/* ---------- Vue desktop : table ---------- */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableTableHead field="id">ID</SortableTableHead>
                            <TableHead></TableHead>
                            <SortableTableHead field="name">Nom</SortableTableHead>
                            <TableHead className="text-end">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Link href={technology.create()}>
                                        <PlusIcon />
                                        Ajouter une technologie
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        {collection.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="rouded-lg aspect-square w-20 object-cover"
                                        />
                                    ) : (
                                        <div className="aspect-square size-20 bg-background"></div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Link
                                        href={technology.edit({
                                            technology: parseInt(item.id),
                                        })}
                                        className="hover:underline"
                                    >
                                        {item.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="item-center flex justify-end gap-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                        >
                                            <Link
                                                href={technology.edit({
                                                    technology: parseInt(item.id),
                                                })}
                                            >
                                                <EditIcon size={16} />
                                            </Link>
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="destructive-outline"
                                            onClick={() =>
                                                setTechnologyToDelete(parseInt(item.id))
                                            }
                                        >
                                            <TrashIcon size={16} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <CollectionPagination collection={collection} />
            <AlertDialog
                open={technologyToDelete !== null}
                onOpenChange={(open) => !open && setTechnologyToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Voulez vous supprimer ce projet ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} variant={'destructive'} >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
});