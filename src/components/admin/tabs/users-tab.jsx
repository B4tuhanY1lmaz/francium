"use client"

import {
    Table, TableBody, TableCaption,
    TableCell, TableHead, TableHeader,TableRow,
    } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen, ShieldAlert } from "lucide-react"
import Link from "next/link"

import { useSession } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"

function AdminUsersTab({ users }) {
    const { data: session } = useSession()
    const { onOpen } = useModal()
    let usersR
    usersR = users.filter((user) => user.name !== session.user?.name)

    const EditUserButton = ({ id }) => {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" asChild>
                        <Link href={`/dashboard/edit/${id}`}>
                            <Pen className="h-5 w-5" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit user</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    const BanUserButton = ({ username, id, email, bans }) => {
        const modalData = {
            name: username,
            id: id,
            mail: email
        }
        const isButtonDisabled = bans.length > 0
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" 
                        onClick={() => onOpen("banUsr", modalData)}
                        disabled={isButtonDisabled}
                    >
                        <ShieldAlert className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ban user</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <>
        <div className="max-w-sm hidden">
            <Label htmlFor="userId">Search by id</Label>
            <Input id="userId" type="text" placeholder="User ID" />
        </div>
            <Table>
                <TableCaption>Total users: {usersR.length}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">
                            Id
                        </TableHead>
                        <TableHead className="w-8">
                            Avatar
                        </TableHead>
                        <TableHead className="w-[140px]">
                            Username
                        </TableHead>
                        <TableHead className="w-[150px]">
                            E-mail
                        </TableHead>
                        <TableHead>
                            Created at
                        </TableHead>
                        <TableHead>
                            Links count
                        </TableHead>
                        <TableHead>
                            Role
                        </TableHead>
                        <TableHead>
                            Is Banned
                        </TableHead>
                        <TableHead>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersR.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.id}
                            </TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarFallback>
                                        {item.name.substring(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                    <AvatarImage src={item.image} />
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                {item.name}
                            </TableCell>
                            <TableCell>
                                {item.email}
                            </TableCell>
                            <TableCell>
                                {new Date(item.createdAt).toDateString()}
                            </TableCell>
                            <TableCell>
                                {item.links.length}
                            </TableCell>
                            <TableCell>
                                {item.role}
                            </TableCell>
                            <TableCell>
                                {item.bans.length > 0 ? (<p>True</p>) : (<p>False</p>)}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <EditUserButton 
                                        id={item.id}
                                    />
                                    <BanUserButton 
                                        username={item.name} 
                                        id={item.id} 
                                        email={item.email}
                                        bans = {item.bans}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default AdminUsersTab