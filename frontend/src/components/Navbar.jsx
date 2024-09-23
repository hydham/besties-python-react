import { Box, Button, Container, Flex, Image, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { IoMoon } from "react-icons/io5";
import React from 'react'
import { LuSun } from "react-icons/lu";
import CreateUserModel from './CreateUserModel';


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Container maxW={"900px"}>
            <Box
                px={4}
                my={4}
                borderRadius={5}
                bg={useColorModeValue("gray.200", "gray.700")}
            >
                <Flex
                    justifyContent={"space-between"}

                    h={16}
                    alignItems={"center"}
                >
                    {/* Left Side */}
                    <Flex
                        justifyContent={"center"}
                        display={{ sm: "flex", base: "none" }}

                        alignItems={"center"}
                        gap={3}
                    >
                        <Image src='/python.png' alt='python-logo' h={50} w={50} />

                        <Text fontSize={40}>+</Text>

                        <Image src='/react.png' alt='python-logo' h={50} w={50} />

                        <Text fontSize={40} >=</Text>

                        <Image src='/explode.png' alt='explode-logo' h={45} w={45} />
                    </Flex>

                    {/* Right Side */}
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={3}
                    >
                        <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
                            BFFship
                        </Text>

                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                        </Button>

                        <CreateUserModel />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    )
}

export default Navbar