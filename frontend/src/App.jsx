import { Container, Stack, Text } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"
import { useState } from "react"
export const BASE_URL = "http://localhost:5000/api"

function App() {

  return (
    <Stack minH={"100vh"}>
      <Navbar></Navbar>

      <Container maxW={"1200px"} >

        <Text
          textAlign={"center"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          fontSize={{ base: "3xl", md: "50" }}
          letterSpacing={"2px"}
          mb={8}

        >
          <Text as={'span'} bgGradient={'linear(to-r, cyan.300,blue.500)'}
            bgClip={"text"}
          >
            my besties
          </Text>
          🚀
        </Text>

        <UserGrid></UserGrid>
      </Container>
    </Stack>
  )
}

export default App
