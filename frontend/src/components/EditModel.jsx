import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BiEditAlt } from "react-icons/bi";
import { useFriendStore } from '../store/friend';


const EditModel = ({ user }) => {

    const {updateFriend} = useFriendStore()
    const [updatedUser, setUpdatedUser] = useState({
        name: user.name,
        role: user.role,
        description: user.description
    })

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClose = () => {
        setUpdatedUser({
            name: user.name,
            role: user.role,
            description: user.description
        })
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { success, message } = await updateFriend(user.id, updatedUser)

        if (!success) {
            toast({
                status: "error",
                title: "Error on update",
                description: message,
                duration: 2000
            })
        } else {
            toast({
                status: "success",
                title: "Update Success",
                description: "Friend details are updated",
                duration: 2000
            })

            onClose()
        }

        setIsLoading(false)
    }

    return (
        <>
            <IconButton
                icon={<BiEditAlt />}
                size={'sm'}
                aria-label='edit menu'
                variant={'ghost'}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={handleClose}>
                <ModalOverlay />
                <form onSubmit={handleUpdateUser}>
                    <ModalContent>
                        <ModalHeader>Edit BFF</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex gap={4} alignItems={"center"}>
                                {/* Left */}
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        value={updatedUser.name}
                                        onChange={e => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
                                </FormControl>

                                {/* Right */}
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        value={updatedUser.role}
                                        onChange={e => setUpdatedUser({ ...updatedUser, role: e.target.value })} />
                                </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={'none'}
                                    overflow={'hidden'}
                                    value={updatedUser.description}
                                    onChange={e => setUpdatedUser({ ...updatedUser, description: e.target.value })}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
                                Update Friend
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default EditModel