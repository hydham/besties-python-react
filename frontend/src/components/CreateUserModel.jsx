import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import { BiAddToQueue } from "react-icons/bi";

import React, { useState } from 'react'
import { useFriendStore } from '../store/friend';

const CreateUserModel = () => {

    const { createFriend } = useFriendStore()
    const [isloading, setIsLoading] = useState(false)
    const [inputs, setInputs] = useState({
        name: '',
        role: '',
        gender: '',
        description: ''
    })
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleResetInputs = () => {
        setInputs({
            name: '',
            role: '',
            gender: '',
            description: ''
        })
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const { success, message } = await createFriend(inputs)

        if (success) {
            toast({
                title: "Yayy! 👌",
                description: "Friend created successfully",
                status: "success",
                duration: 2000,
                position: "top-center"
            })
            onClose();
        } else {
            toast({
                title: "Error occured",
                description: message,
                status: "error",
                duration: 2000
            })
        }

        setIsLoading(false)
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={handleResetInputs}>
                <ModalOverlay />
                <form onSubmit={handleCreateUser}>
                    <ModalContent>
                        <ModalHeader>My New BFF</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex gap={4} alignItems={"center"}>
                                {/* Left */}
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input placeholder='John Doe'
                                        onChange={e => setInputs({ ...inputs, name: e.target.value })} />
                                </FormControl>

                                {/* Right */}
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input placeholder='Engineer'
                                        onChange={e => setInputs({ ...inputs, role: e.target.value })} />
                                </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={'none'}
                                    overflow={'hidden'}
                                    placeholder='Software engineer likes to build things'
                                    onChange={e => setInputs({ ...inputs, description: e.target.value })}
                                />
                            </FormControl>

                            <RadioGroup mt={4} >
                                <Flex gap={5}>
                                    <Radio value='male' onChange={e => setInputs({ ...inputs, gender: e.target.value })} >Male</Radio>
                                    <Radio value='female' onChange={e => setInputs({ ...inputs, gender: e.target.value })} >Female</Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type='submit' colorScheme='blue' mr={3} isLoading={isloading}>
                                Add Friend
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default CreateUserModel