import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import EditModel from './EditModel'
import { BiTrash } from "react-icons/bi";

const UserCard = ({ user }) => {
    return (
        <Card>
            <CardHeader>
                <Flex gap={4} >
                    <Flex flex={1} gap={4} alignItems={'center'}>
                        <Avatar src='https://avatar.iran.liara.run/public'></Avatar>
                        <Box>
                            <Heading size={'sm'}>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>

                    <Flex>
                        <EditModel user={user}></EditModel>
                        <IconButton
                            colorScheme='red'
                            icon={<BiTrash/>}
                            variant={'ghost'}
                            size={'sm'}
                            aria-label='see menu'
                        />
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>
                    {user.description}
                </Text>
            </CardBody>
        </Card>
    )
}

export default UserCard