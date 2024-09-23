import { Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import { BiAddToQueue } from "react-icons/bi";

import React from 'react'

const CreateUserModel = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>My New BFF</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex gap={4} alignItems={"center"}>
                            {/* Left */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder='John Doe' />
                            </FormControl>

                            {/* Right */}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder='Engineer' />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                resize={'none'}
                                overflow={'hidden'}
                                placeholder='Software engineer likes to build things'
                            />
                        </FormControl>

                        <RadioGroup mt={4} defaultValue='male'>
                            <Flex gap={5}>
                                <Radio>Male</Radio>
                                <Radio>Female</Radio>
                            </Flex>
                        </RadioGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Add Friend
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateUserModel