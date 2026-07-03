import { Form, Link, router } from '@inertiajs/react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
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
import project from '@/routes/project';
import type { BreadcrumbItem, PaginatedCollection, Project } from '@/types';

const Breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projets réalisés',
        href: project.index()
    },
];

type Props = {
    collection: PaginatedCollection<Project>;
    q: string;
};

export default WithAppLayout(Breadcrumbs, ({ collection, q }: Props) => {
    const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

    const handleDelete = () => {
        if (projectToDelete === null) {
            return;
        }

        router.delete(project.destroy({ project: projectToDelete }).url, {
            onFinish: () => setProjectToDelete(null),
        });
    };

    return (
        <div className="space-y-4">
            <TopAction>
                <Form
                    {...project.index.form}
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
                        <TableHead></TableHead>
                        <SortableTableHead field="title">Nom</SortableTableHead>
                        <SortableTableHead field="status">Status</SortableTableHead>
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
                                <Link href={project.create()}>
                                    <PlusIcon />
                                    Ajouter un projet
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
                                        className="rounded-lg aspect-square w-20 object-cover"
                                    />
                                ) : (
                                    <div className="aspect-square size-20 bg-background"></div>
                                )}
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={project.edit({
                                        project: parseInt(item.id),
                                    })}
                                    className="hover:underline"
                                >
                                    {item.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={project.edit({
                                        project: parseInt(item.id),
                                    })}
                                    className="hover:underline"
                                >
                                    {item.status}
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
                                            href={project.edit({
                                                project: parseInt(item.id),
                                            })}
                                        >
                                            <EditIcon size={16} />
                                        </Link>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="destructive-outline"
                                        onClick={() =>
                                            setProjectToDelete(parseInt(item.id))
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
                open={projectToDelete !== null}
                onOpenChange={(open) => !open && setProjectToDelete(null)}
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
