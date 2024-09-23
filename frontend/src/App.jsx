import { Container, Stack, Text } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"
import { USERS } from "./dummy/dummy"

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

        <UserGrid users={USERS}></UserGrid>
      </Container>
    </Stack>
  )
}

export default App
