import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extendTheme } from '@chakra-ui/react';

import {
  Box,
  Flex,
  HStack,
  Container,
  IconButton,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Input,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useWallet } from '../helper/WalletContext';
import {
  CONTRACT_ADDRESS,
  TOKEN_ADDRESS,
  wallet,
  Tezos,
} from '../helper/tezos';
import { TezosToolkit, MichelCodecPacker, compose } from '@taquito/taquito';
import Loading from '../helper/Loading';
import SignIn from './SignIn/signin';
import logoIcon from './assets/beta2.png';

const Redeem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submit = async (e) => {
    e.preventDefault();
    const { tokenId, amount } = e.target.elements;
    console.log(tokenId.value, amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);

    const op = await contract.methods
      .redeemTokens(parseInt(amount.value), parseInt(tokenId.value))
      .send();
    await op.confirmation(1);
    alert('Redemption Completed!');
  };

  const theme = extendTheme({
    textStyles: {
      h1: {
        fontSize: ['10px'],
      },
    },
  });

  return (
    <>
      <MenuItem onClick={onOpen} color="black">
        Redeem
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#1A1A1A">
          <ModalHeader>Redeem Token</ModalHeader>
          <ModalBody>
            <form onSubmit={submit}>
              <FormControl>
                <Input
                  required
                  type="number"
                  name="tokenId"
                  placeholder="Token ID"
                  _placeholder={{ color: 'white' }}
                ></Input>
              </FormControl>
              <FormControl marginTop="5">
                <Input
                  required
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
              <Flex justifyContent="center" marginTop="5">
                <Button type="submit" bgColor="#9C4FFF">
                  Redeem
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default function Header({ links = [] }) {
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, disconnect, activeAccount, connected } = useWallet();
  const { colorMode, toggleColorMode } = useColorMode();

  const whiteListProposer = async () => {
    const contract = await wallet.at(CONTRACT_ADDRESS);
    const op1 = await contract.methods
      .addProposers(activeAccount.address)
      .send();

    await op1.confirmation(1);
    alert('Proposer queued for Approval. Approvals usually take 12 hours. For faster approvals post your wallet in telegram');
  };

  return (
    <Box
      color={'white'}
      // bg={useColorModeValue('222737', '222737')}
      backgroundColor="#1A1A1A"
      px={4}
      py={2}
      zIndex="9999"
      // sx={{ position: '-webkit-sticky', position: 'sticky', top: '0' }}
    >
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        px={{ base: '0', md: '20', lg: '20' }}
        paddingBottom={{ base: '0', md: '0', lg: '0' }}
        flexDirection={{ base: 'row', md: 'row', lg: 'row' }}
        // bgColor="red"
      >
        <IconButton
          size={'md'}
          icon={
            isOpen ? (
              <CloseIcon color="white" />
            ) : (
              <HamburgerIcon color="white" marginTop="-3px" />
            )
          }
          bgColor="#9C4FFF"
          focusBorderColor="none"
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          _focus={{ outline: 'none' }}
        />

        <Flex
          alignItems={'center'}
          justifyContent={{ base: 'start', md: 'start', lg: 'start' }}
          w={{ base: '50%', md: '20%', lg: '20%' }}
        >
          <Link href="/" _focus={{ outline: 'none' }}>
            <Image
              height="auto"
              w={{ base: '95px', md: '100px', lg: '150px' }}
              src={logoIcon}
            />
          </Link>
        </Flex>

        <Flex
          display={{ base: 'none', md: 'flex', lg: 'flex' }}
          alignItems={'center'}
          justifyContent={'center'}
          flex
          w="40%"
        >
          <Link
            fontSize={{ base: '10', md: 'sm', lg: 'md' }}
            paddingStart="3"
            paddingEnd="3"
            colorScheme="blue"
            href="/"
            className="header"
            _focus={{ outline: 'none' }}
          >
            Marketplaces
          </Link>
          <Link
            fontSize={{ base: '10', md: 'sm', lg: 'md' }}
            paddingStart="3"
            paddingEnd="3"
            colorScheme="blue"
            href="/Portfolio"
            textAlign="center"
            className="header"
            _focus={{ outline: 'none' }}
          >
            Portfolio
          </Link>
          <Link
            fontSize={{ base: '10', md: 'sm', lg: 'md' }}
            paddingStart="3"
            paddingEnd="3"
            colorScheme="blue"
            href="/mypreds"
            textAlign="center"
            className="header"
            _focus={{ outline: 'none' }}
          >
            Predictions
          </Link>
        </Flex>

        <Flex
          alignItems={'center'}
          w="20%"
          justifyContent={{ base: 'end', md: 'end', lg: 'end' }}
        >
          {/* <IconButton
            marginRight="10px"
            icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          /> */}
          <Box display="flex" justifyContent="end">
            {!connected ? (
              <Flex alignItems={'center'} justifyContent={'end'}>
                <Button
                  borderRadius="15"
                  color={'black'}
                  onClick={connect}
                  fontSize={{ base: '10', md: 'md', lg: 'md' }}
                  className="header"
                  padding="10px"
                  bgColor="white"
                  _focus={{ outline: 'none' }}
                >
                  Connect Wallet
                </Button>
              </Flex>
            ) : (
              <Menu>
                <MenuButton as={Button} cursor={'pointer'} minW={0} w="30%">
                  <Text
                    maxW="300px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    color="black"
                  >
                    {activeAccount?.address}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    color="black"
                    onClick={() => history('/mypreds')}
                    _focus={{ outline: 'none' }}
                  >
                    My Predictions
                  </MenuItem>
                  <MenuItem
                    color="black"
                    onClick={whiteListProposer}
                    _focus={{ outline: 'none' }}
                  >
                    Whitelist Me
                  </MenuItem>
                  <MenuItem
                    color="black"
                    onClick={disconnect}
                    _focus={{ outline: 'none' }}
                  >
                    Disconnect
                  </MenuItem>
                  <MenuItem
                    color="black"
                    onClick={() => history('/redeem')}
                    _focus={{ outline: 'none' }}
                  >
                    Redeem
                  </MenuItem>
                  <></>
                </MenuList>
              </Menu>
            )}
          </Box>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {!connected ? (
              <Box cursor={'pointer'} minW={0} bgColor="#1A1A1A">
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  w="100%"
                  flexDirection="column"
                  gap="5"
                  marginTop="2"
                >
                  <Link
                    fontSize={{ base: '10', md: 'sm', lg: 'md' }}
                    paddingStart="3"
                    paddingEnd="3"
                    colorScheme="blue"
                    href="/"
                    className="header"
                    _focus={{ outline: 'none' }}
                  >
                    Marketplace
                  </Link>
                  <Link
                    fontSize={{ base: '10', md: 'sm', lg: 'md' }}
                    paddingStart="3"
                    paddingEnd="3"
                    colorScheme="blue"
                    href="/Portfolio"
                    textAlign="center"
                    className="header"
                    _focus={{ outline: 'none' }}
                  >
                    Portfolio
                  </Link>
                  <Link
                    fontSize={{ base: '10', md: 'sm', lg: 'md' }}
                    paddingStart="3"
                    paddingEnd="3"
                    colorScheme="blue"
                    href="/mypreds"
                    textAlign="center"
                    className="header"
                    _focus={{ outline: 'none' }}
                  >
                    Predictions
                  </Link>
                </Flex>
              </Box>
            ) : (
              <Box minW={0} bgColor="#1A1A1A">
                <Flex
                  alignItems={'center'}
                  justifyContent={'center'}
                  w="100%"
                  flexDirection="column"
                  marginTop="3"
                  gap="3"
                >
                  <Link
                    fontSize={{ base: '10', md: 'sm', lg: 'md' }}
                    paddingStart="3"
                    paddingEnd="3"
                    colorScheme="blue"
                    href="/"
                    className="header"
                  >
                    Marketplace
                  </Link>
                  <Link
                    fontSize={{ base: '10', md: 'sm', lg: 'md' }}
                    paddingStart="3"
                    paddingEnd="3"
                    colorScheme="blue"
                    href="/Portfolio"
                    textAlign="center"
                    className="header"
                  >
                    Portfolio
                  </Link>
                  <Link
                    fontSize={{ base: '10', md: 'sm', lg: 'md' }}
                    paddingStart="3"
                    paddingEnd="3"
                    colorScheme="blue"
                    href="/mypreds"
                    textAlign="center"
                    className="header"
                  >
                    Predictions
                  </Link>
                </Flex>
              </Box>
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

const Redeem1 = (tokenID) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log('tokenId', tokenID.tokenID.toString());
  const colors = {
    bg: useColorModeValue('purple.300', 'purple.600'),
    text: useColorModeValue('purple', 'white'),
  };
  const submit = async (e) => {
    e.preventDefault();
    const { amount } = e.target.elements;
    console.log(tokenID.tokenID, amount.value);
    const contract = await wallet.at(CONTRACT_ADDRESS);

    await contract.methods.redeemTokens(amount.value, tokenID.tokenID).send();
  };

  return (
    <Popover returnFocusOnClose={false} placement="right" closeOnBlur={false}>
      <PopoverTrigger>
        <Button bg={colors.bg} textColor={colors.text}>
          Redeem
        </Button>
      </PopoverTrigger>
      <PopoverContent textColor={colors.text}>
        <PopoverHeader fontWeight="semibold">Redeem Token</PopoverHeader>
        <PopoverBody>
          <form onSubmit={submit}>
            <FormControl>
              <FormLabel htmlFor="tokenID">
                Token Id : {tokenID.tokenID.toString()}{' '}
              </FormLabel>
            </FormControl>
            <FormControl>
              <Input
                required
                type="number"
                name="amount"
                placeholder="Amount"
              />
            </FormControl>
            <Button color="black" type="submit">
              Redeem
            </Button>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
