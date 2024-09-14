import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ItemsInterface } from "../../interfaces/interfaces"
import "./ItemContainer.css";
import { Button, Divider, Input, InputAddon, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

interface ItemContainerInterface {
    listId: number;
}

export default function ItemContainer({ listId }: ItemContainerInterface) {
    const { state, execute } = useFetch<ItemsInterface[]>(`http://localhost:8080/api/items?listId=${listId}`);
    const [hidden, setHidden] = useState<boolean>(true);
    const [description, setDescription] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                await execute({ method: "GET" });

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [execute]);

    // const handleHidden = () => {
    //     setHidden(!hidden);
    // }

    const handleItemSubmit = async () => {

        await execute({
            method: "POST",
            body: {
                Description: description,
                Status: "in works"
            }
        })
        setDescription("");
        setHidden(true);
        await execute({
            method: "GET"
        })
    }

    const handleDeleteSubmit = async (itemId: number) => {
        console.log(itemId);
        await execute({
            method: "DELETE",
            url: `http://localhost:8080/api/items/DeleteItem?itemId=${itemId}`
        })
        await execute({
            method: "GET"
        })
    }

    return (
        <>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th>Items</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            state.data != null && state.data.map(item => (
                                <Tr key={item.itemsId}>
                                    <Td
                                        display='flex'
                                        flexDirection='column'
                                        justifyContent='center'
                                        alignItems='center'
                                        p='10px'
                                    >
                                        <Text>Description:{item.description}</Text>
                                        <Text>Status:{item.status}</Text>
                                        <Button onClick={() => handleDeleteSubmit(item.itemsId)}>Remove Item</Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                        <Tr display='flex'>
                            <Input type="text" placeholder="add description" onChange={
                                (e: React.ChangeEvent<HTMLInputElement>) => {
                                    setDescription(e.target.value)
                                }
                            } />
                            <Button onClick={handleItemSubmit}>Submit</Button>
                        </Tr>
                    </Tbody>
                    <Tfoot m='10px'>
                        <Tr>
                            <Divider orientation='horizontal' />
                        </Tr>
                    </Tfoot>

                </Table>
            </TableContainer>

        </>


        // <div>
        //     <div>
        //         <button onClick={handleHidden}>AddItem</button>
        //     </div>
        //     <ul>
        //         {
        //             state.data != null && state.data.map(item => (
        //                 <li key={item.itemsId}>
        //                     Description:{item.description}<br />
        //                     Status:{item.status}
        //                     <button onClick={() => handleDeleteSubmit(item.itemsId)}>Remove Item</button>
        //                 </li>
        //             ))
        //         }
        //     </ul>
        //     <div className={hidden ? "itemFormHidden" : "itemForm"}>
        //         <input type="text" placeholder="add description" onChange={
        //             (e: React.ChangeEvent<HTMLInputElement>) => {
        //                 setDescription(e.target.value)
        //             }
        //         } />
        //         <button onClick={handleItemSubmit}>Submit</button>
        //     </div>
        // </div>

    )
}