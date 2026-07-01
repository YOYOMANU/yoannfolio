import { Form, Link, router } from '@inertiajs/react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { SortableTableHead } from '@/components/sortable-table-head';
import { TopAction } from '@/components/top-action';
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
import type { BreadcrumbItem, Category, PaginatedCollection, Technology } from '@/types';
import technology from '@/routes/technology';
import { WithAppLayout } from '@/layouts/app-layout';
import category from '@/routes/category';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: category.index()
    },
];

type Props = {
    collection: PaginatedCollection<Category>;
    q: string;
};

export default WithAppLayout(Breadcrumbs, ({ collection, q }: Props) => {
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

    const handleDelete = () => {
        if (categoryToDelete === null) return;

        router.delete(category.destroy({ category: categoryToDelete }).url, {
            onFinish: () => setCategoryToDelete(null),
        });
    };

    return (
        <div className="space-y-4">
            <TopAction>
                <Form
                    {...technology.index.form}
                    className="flex items-center gap-2"
                >
                    <Input
                        placeholder="Rechercher..."
                        name="q"
                        defaultValue={q ?? ''}
                        autoFocus
                    />
                    <Button>Rechercher</Button>
                </Form>
            </TopAction>
            <Table>
                <TableHeader>
                    <TableRow>
                        <SortableTableHead field="id">ID</SortableTableHead>
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
                                <Link href={category.create()}>
                                    <PlusIcon />
                                    Ajouter une categorie
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    {collection.data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>

                            <TableCell>
                                <Link
                                    href={category.edit({
                                        category: parseInt(item.id),
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
                                            href={category.edit({
                                                category: parseInt(item.id),
                                            })}
                                        >
                                            <EditIcon size={16} />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive-outline"
                                        onClick={() =>
                                            setCategoryToDelete(parseInt(item.id))
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
            <CollectionPagination collection={collection} />

            <AlertDialog
                open={categoryToDelete !== null}
                onOpenChange={(open) => !open && setCategoryToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Voulez vous supprimer cette catégorie ?
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