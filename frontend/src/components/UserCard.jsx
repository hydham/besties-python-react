import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import EditModel from './EditModel'
import { BiTrash } from "react-icons/bi";
import { useFriendStore } from '../store/friend';

const UserCard = ({ user }) => {

const {deleteFriend} = useFriendStore()
    const toast = useToast()

    const handleDeleteUser = async () => {

        const { success, message } = await deleteFriend(user.id)

        if (success) {
            toast({
                status: "success",
                title: "Account deleted",
                description: message,
                duration: 2000
            })
        } else {
            toast({
                status: "error",
                title: "Error deleting user occured",
                description: message,
                duration: 2000
            })
        }
    }
    return (
        <Card>
            <CardHeader>
                <Flex gap={4} >
                    <Flex flex={1} gap={4} alignItems={'center'}>
                        <Avatar src={user.imgUrl}></Avatar>
                        <Box>
                            <Heading size={'sm'}>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                    </Flex>

                    <Flex>
                        <EditModel user={user}></EditModel>
                        <IconButton
                            colorScheme='red'
                            icon={<BiTrash />}
                            variant={'ghost'}
                            size={'sm'}
                            aria-label='see menu'
                            onClick={handleDeleteUser}

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