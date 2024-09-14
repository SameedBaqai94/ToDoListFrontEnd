import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Home.css";
import ListContainer from "../components/ListContainer/ListContainer";
import { ListInterface } from "../interfaces/interfaces";
import { Box, Button, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

export default function Home() {
    const { state, execute } = useFetch<ListInterface[]>("http://localhost:8080/api/todolist/");
    const [list, setList] = useState<ListInterface[] | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [title, setTitle] = useState<string>("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                await execute({ method: "GET" });

            } catch (e) {
                console.log(e);
            }
        }
        fetchData();

    }, [execute])

    useEffect(() => {
        setList(state.data);
    }, [state])

    const handleClick = async () => {
        await execute({
            method: "POST",
            body: { Title: title }
        })
        setTitle("");
        await execute({
            method: "GET"
        })
    }

    const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value.toLowerCase());
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const filteredList = list?.filter(l =>
        l.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <Box w='600px' borderColor="black" borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box display="flex" p='6' borderColor="blue" borderWidth='1px' borderRadius='sm'>
                    <Box w='50%' p='2' borderColor="red" borderWidth='1px' borderRadius='sm'>
                        <Input placeholder='Search List' onChange={changeValue} value={searchValue} />
                    </Box>
                    <Box display='flex' justifyContent='space-between' w='50%' p='2' borderColor="green" borderWidth='1px' borderRadius='sm'>
                        <Input placeholder='Add List' onChange={changeTitle} value={title} />
                        <Button onClick={handleClick}>AddList</Button>
                    </Box>
                </Box>
            </Box>
            {list && <ListContainer list={filteredList} />}

        </>

        // <div className="container">
        //     <div className="searchAndAddContainer">
        //         <div className="searchContainer">
        //             <input type="text" placeholder="Search List" onChange={changeValue} value={searchValue} />
        //         </div>
        //         <div className="addListContainer">
        //             <input type="text" placeholder="Add List" onChange={
        //                 (e: React.ChangeEvent<HTMLInputElement>) => {
        //                     setTitle(e.target.value);
        //                 }} />
        //             <button onClick={handleClick}>Add List</button>
        //         </div>
        //     </div>
        //     <div className="listContainer">

        //         {list && <ListContainer list={filteredList} />}


        //     </div>
        // </div>
    )
}