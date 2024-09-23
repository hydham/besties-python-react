import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BiEditAlt } from "react-icons/bi";


const EditModel = ({user}) => {

  const {isOpen, onOpen, onClose} = useDisclosure()

  return (
    <>
      <IconButton
        icon={<BiEditAlt/>}
        size={'sm'}
        aria-label='edit menu'
        variant={'ghost'}
        onClick={onOpen}
      />

<Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit BFF</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex gap={4} alignItems={"center"}>
                            {/* Left */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder={user.name} />
                            </FormControl>

                            {/* Right */}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder= {user.role} />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                resize={'none'}
                                overflow={'hidden'}
                                placeholder= {user.description}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Update Friend
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </>
  )
}

export default EditModel