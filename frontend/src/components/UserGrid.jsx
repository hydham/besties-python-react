import { Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../App'
import { useFriendStore } from '../store/friend'


const UserGrid = () => {

    const { friends, getFriends } = useFriendStore()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            await getFriends()
            setIsLoading(false)
        }
        getUsers();

    }, [getFriends])

    return (
        <>
            <Grid templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
            }}
                gap={4}
            >
                {
                    friends.map(user => <UserCard key={user.id} user={user} />)
                }

            </Grid>

            {
                !isLoading && friends.length === 0 && (
                    <Flex justifyContent={'center'}>
                        <Text>
                            <Text as={'span'} fontWeight={'bold'}>
                                Sorry you 😒
                            </Text>
                            No friends
                        </Text>
                    </Flex>
                )
            }

            {
                isLoading && <Flex justifyContent={'center'}><Spinner /></Flex>
            }
        </>
    )
}

export default UserGrid