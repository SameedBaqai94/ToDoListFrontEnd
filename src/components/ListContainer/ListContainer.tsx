import { ListInterface } from "../../interfaces/interfaces";
import ItemContainer from "../ItemContainer/ItemContainer";
import { Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

import "./ListContainer.css";

interface ListComponentInterface {
    list: ListInterface[];
}

export default function ListContainer({ ...props }: ListComponentInterface) {
    return (
        <>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>To Do List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>List</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* {props.list.map(l => (
                            <tr key={l.toDoListId}>
                                <td>{l.title}</td>

                                <ItemContainer listId={l.toDoListId} />
                            </tr>
                        ))} */}
                        {props.list.map(l => (
                            <Tr key={l.toDoListId}>
                                <Td>{l.title}</Td>
                                <ItemContainer listId={l.toDoListId} />

                            </Tr>
                        ))}

                    </Tbody>

                </Table>
            </TableContainer>
            {/* <table className="listContainer">
                <tbody>
                    {props.list.map(l => (
                        <tr key={l.toDoListId}>
                            <td>{l.title}</td>

                            <ItemContainer listId={l.toDoListId} />
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>

    )
}