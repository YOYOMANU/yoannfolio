import { Form, Link } from '@inertiajs/react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
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
import WithAppLayout from '@/layouts/app-layout';
import category from '@/routes/category';

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
                                        asChild
                                        size="icon"
                                        variant="destructive-outline"
                                    >
                                        <Link
                                            href={category.destroy({
                                                category: parseInt(item.id),
                                            })}
                                            onBefore={() =>
                                                confirm(
                                                    'Voulez vous vraiment supprimer cette categorie ?',
                                                )
                                            }
                                        >
                                            <TrashIcon size={16} />
                                        </Link>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CollectionPagination collection={collection} />
        </div>
    );
});
